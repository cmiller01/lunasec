import {
  FrameMessage,
  InboundFrameMessageMap,
  UnknownFrameMessage,
  FrameNotification,
  InboundFrameNotificationMap,
  UnknownFrameNotification
} from '@lunasec/secure-frame-common/build/main/rpc/types';
import {Tokenizer} from "@lunasec/tokenizer-sdk";

function createMessageToFrame<K extends keyof InboundFrameMessageMap>(s: K, correlationToken: string, createMessage: () => InboundFrameMessageMap[K]): FrameMessage<InboundFrameMessageMap, K> {

  const innerMessage = createMessage();

  return {
    command: s,
    correlationToken: correlationToken,
    data: innerMessage
  };
}

function createNotificationToFrame<K extends keyof InboundFrameNotificationMap>(
  s: K,
  frameNonce: string,
  createNotification: () => InboundFrameNotificationMap[K] = () => ({})
): FrameNotification<InboundFrameNotificationMap, K> {
  const innerMessage = createNotification();

  return {
    command: s,
    frameNonce: frameNonce,
    data: innerMessage
  };
}

async function tokenizeField(): Promise<string | null> {
  const secureInput = document.querySelector('.secure-input');

  if (!secureInput) {
    throw new Error('Unable to read value to tokenize');
  }

  const value = (secureInput as HTMLInputElement).value;

  const tokenizer = new Tokenizer();
  const resp = await tokenizer.tokenize(value);

  if (!resp.success) {
    console.error("tokenizer error:", resp);
    return null;
  }
  return resp.tokenId
}

export function sendMessageToParentFrame(origin: string, message: UnknownFrameMessage | UnknownFrameNotification) {
  window.parent.postMessage(JSON.stringify(message), origin);
}

export function respondWithTokenizedValue(origin: string, rawMessage: UnknownFrameMessage, token: string | null): void {
  const message = createMessageToFrame('ReceiveCommittedToken', rawMessage.correlationToken, () => {
    if (token === null) {
      return {
        success: false,
        error: "tokenizer failed to tokenize data"
      };
    }

    return {
      success: true,
      token: token
    };
  });

  sendMessageToParentFrame(origin, message);
  return;
}

export function notifyParentOfOnBlurEvent(origin: string, frameNonce: string) {
  const message = createNotificationToFrame('NotifyOnBlur', frameNonce);

  sendMessageToParentFrame(origin, message);
}

export async function processMessage(origin: string, rawMessage: UnknownFrameMessage) {

  // TODO: Make this type safe (require every message to be handled)
  if (rawMessage.command === 'CommitToken') {
    const serverResponse = await tokenizeField();
    respondWithTokenizedValue(origin, rawMessage, serverResponse);
    return;
  }

  throw new Error('Secure frame unable to process message of command type: ' + rawMessage.command);
}