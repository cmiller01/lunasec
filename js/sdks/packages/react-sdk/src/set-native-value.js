"use strict";
// Used by SecureForm to write tokens to hidden inputs
// This madness is necessary to set a value on a react element in a way that will trigger the onChange listener.  As of
// 2021, setting the value by ref will not trigger onChange listeners.
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: make this work with typescript and eslint
/* eslint-disable */
function setNativeValue(element, value) {
    // @ts-ignore
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    // @ts-ignore
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
    if (valueSetter && valueSetter !== prototypeValueSetter) {
        // @ts-ignore
        prototypeValueSetter.call(element, value);
    }
    else {
        // @ts-ignore
        valueSetter.call(element, value);
    }
}
exports.default = setNativeValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LW5hdGl2ZS12YWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldC1uYXRpdmUtdmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNEQUFzRDtBQUN0RCx1SEFBdUg7QUFDdkgsc0VBQXNFOztBQUV0RSxrREFBa0Q7QUFDbEQsb0JBQW9CO0FBQ3BCLFNBQXdCLGNBQWMsQ0FBQyxPQUF5QixFQUFFLEtBQWE7SUFDN0UsYUFBYTtJQUNiLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzFFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsYUFBYTtJQUNiLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFFckYsSUFBSSxXQUFXLElBQUksV0FBVyxLQUFLLG9CQUFvQixFQUFFO1FBQ3ZELGFBQWE7UUFDYixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzNDO1NBQU07UUFDTCxhQUFhO1FBQ2IsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbEM7QUFDSCxDQUFDO0FBZEQsaUNBY0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBVc2VkIGJ5IFNlY3VyZUZvcm0gdG8gd3JpdGUgdG9rZW5zIHRvIGhpZGRlbiBpbnB1dHNcbi8vIFRoaXMgbWFkbmVzcyBpcyBuZWNlc3NhcnkgdG8gc2V0IGEgdmFsdWUgb24gYSByZWFjdCBlbGVtZW50IGluIGEgd2F5IHRoYXQgd2lsbCB0cmlnZ2VyIHRoZSBvbkNoYW5nZSBsaXN0ZW5lci4gIEFzIG9mXG4vLyAyMDIxLCBzZXR0aW5nIHRoZSB2YWx1ZSBieSByZWYgd2lsbCBub3QgdHJpZ2dlciBvbkNoYW5nZSBsaXN0ZW5lcnMuXG5cbi8vIFRPRE86IG1ha2UgdGhpcyB3b3JrIHdpdGggdHlwZXNjcmlwdCBhbmQgZXNsaW50XG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0TmF0aXZlVmFsdWUoZWxlbWVudDogSFRNTElucHV0RWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IHZhbHVlU2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LCAndmFsdWUnKS5zZXQ7XG4gIGNvbnN0IHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihlbGVtZW50KTtcbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCBwcm90b3R5cGVWYWx1ZVNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCAndmFsdWUnKS5zZXQ7XG5cbiAgaWYgKHZhbHVlU2V0dGVyICYmIHZhbHVlU2V0dGVyICE9PSBwcm90b3R5cGVWYWx1ZVNldHRlcikge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcm90b3R5cGVWYWx1ZVNldHRlci5jYWxsKGVsZW1lbnQsIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdmFsdWVTZXR0ZXIuY2FsbChlbGVtZW50LCB2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==