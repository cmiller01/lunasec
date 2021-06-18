import { camelCaseObject } from '@lunasec/browser-common';
import classnames from 'classnames';
import React, { Component, CSSProperties } from 'react';

import { RenderData, WrappedComponentProps } from '../../types';

type InputRenderData = RenderData<'Input'>;
export type InputProps = WrappedComponentProps<'Input'>;

export default class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  componentDidMount() {
    this.props.renderData.mountedCallback();
  }

  renderFrame(renderData: InputRenderData) {
    if (!renderData.frameStyleInfo) {
      return null;
    }

    const { parentStyle, width, height } = renderData.frameStyleInfo;
    const iframeStyle: CSSProperties = {
      ...camelCaseObject(parentStyle),
      display: 'block',
      width: width,
      height: height,
    };

    const frameContainerClass = classnames(renderData.frameContainerClasses);

    return (
      <iframe
        ref={renderData.frameRef}
        src={renderData.frameUrl}
        className={frameContainerClass}
        style={iframeStyle}
        frameBorder={0}
        key={renderData.frameUrl}
      />
    );
  }

  render() {
    // Pull the renderData out so we don't weird stuff into our dummy element
    const { renderData, className, children, ...otherProps } = this.props;

    const containerClass = classnames({
      [`secure-input-container-${renderData.frameId} secure-input-container-${this.props.name}`]: true,
      // Combine with the classname passed in props because styled-components passes some random classnames to attach our css
      [className || '']: true,
    });

    return (
      <div style={renderData.parentContainerStyle} className={containerClass}>
        <input
          ref={renderData.dummyRef}
          style={{ ...renderData.dummyElementStyle, ...this.props.style }}
          tabIndex={-1}
          {...otherProps}
        />
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}