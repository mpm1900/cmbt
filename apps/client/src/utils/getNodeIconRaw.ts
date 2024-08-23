import { GameWorldNodeIconKey } from '@repo/game/types'

export type NodeIconProps = {
  size: number
}

const startSvg = (props: NodeIconProps) =>
  `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="${props.size}px" width="${props.size}px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path></svg>`
const skullSvg = (props: NodeIconProps) =>
  `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="${props.size}px" width="${props.size}px" xmlns="http://www.w3.org/2000/svg"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1 1 56-56 56.06 56.06 0 0 1-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1 1 56-56 56.06 56.06 0 0 1-56 56zm104 32z"></path></svg>`
const payMoneySvg = (props: NodeIconProps) =>
  `<svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" height="${props.size}px" width="${props.size}px" xmlns="http://www.w3.org/2000/svg"><g class="" style="" transform="translate(-10,-9)"><path d="M298.9 24.31c-14.9.3-25.6 3.2-32.7 8.4l-97.3 52.1-54.1 73.59c-11.4 17.6-3.3 51.6 32.3 29.8l39-51.4c49.5-42.69 150.5-23.1 102.6 62.6-23.5 49.6-12.5 73.8 17.8 84l13.8-46.4c23.9-53.8 68.5-63.5 66.7-106.9l107.2 7.7-1-112.09-194.3-1.4zM244.8 127.7c-17.4-.3-34.5 6.9-46.9 17.3l-39.1 51.4c10.7 8.5 21.5 3.9 32.2-6.4 12.6 6.4 22.4-3.5 30.4-23.3 3.3-13.5 8.2-23 23.4-39zm-79.6 96c-.4 0-.9 0-1.3.1-3.3.7-7.2 4.2-9.8 12.2-2.7 8-3.3 19.4-.9 31.6 2.4 12.1 7.4 22.4 13 28.8 5.4 6.3 10.4 8.1 13.7 7.4 3.4-.6 7.2-4.2 9.8-12.1 2.7-8 3.4-19.5 1-31.6-2.5-12.2-7.5-22.5-13-28.8-4.8-5.6-9.2-7.6-12.5-7.6zm82.6 106.8c-7.9.1-17.8 2.6-27.5 7.3-11.1 5.5-19.8 13.1-24.5 20.1-4.7 6.9-5.1 12.1-3.6 15.2 1.5 3 5.9 5.9 14.3 6.3 8.4.5 19.7-1.8 30.8-7.3 11.1-5.5 19.8-13 24.5-20 4.7-6.9 5.1-12.2 3.6-15.2-1.5-3.1-5.9-5.9-14.3-6.3-1.1-.1-2.1-.1-3.3-.1zm-97.6 95.6c-4.7.1-9 .8-12.8 1.9-8.5 2.5-13.4 7-15 12.3-1.7 5.4 0 11.8 5.7 18.7 5.8 6.8 15.5 13.3 27.5 16.9 11.9 3.6 23.5 3.5 32.1.9 8.6-2.5 13.5-7 15.1-12.3 1.6-5.4 0-11.8-5.8-18.7-5.7-6.8-15.4-13.3-27.4-16.9-6.8-2-13.4-2.9-19.4-2.8z" fill-opacity="1"></path></g></svg>`
const locked = (props: NodeIconProps) =>
  `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="${props.size}px" width="${props.size}px" xmlns="http://www.w3.org/2000/svg"><path d="M368 192h-16v-80a96 96 0 1 0-192 0v80h-16a64.07 64.07 0 0 0-64 64v176a64.07 64.07 0 0 0 64 64h224a64.07 64.07 0 0 0 64-64V256a64.07 64.07 0 0 0-64-64zm-48 0H192v-80a64 64 0 1 1 128 0z"></path></svg>`
const unlocked = (props: NodeIconProps) =>
  `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="${props.size}px" width="${props.size}px" xmlns="http://www.w3.org/2000/svg"><path d="M368 192H192v-80a64 64 0 1 1 128 0 16 16 0 0 0 32 0 96 96 0 1 0-192 0v80h-16a64.07 64.07 0 0 0-64 64v176a64.07 64.07 0 0 0 64 64h224a64.07 64.07 0 0 0 64-64V256a64.07 64.07 0 0 0-64-64z"></path></svg>`
const question = (props: NodeIconProps) =>
  `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="${props.size}" width="${props.size}" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14"></path></svg>`

export function getNodeIconRaw(
  key: GameWorldNodeIconKey,
  props: NodeIconProps
): string {
  switch (key) {
    case '?':
      return question(props)
    case 'combat':
      return skullSvg(props)
    case 'locked':
      return locked(props)
    case 'shop':
      return payMoneySvg(props)
    case 'start':
      return startSvg(props)
    case 'unlocked':
      return unlocked(props)
    default:
      return ''
  }
}
