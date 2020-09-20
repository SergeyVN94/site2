// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface JQuery {
  calendar(command: 'get-range'): { start: Date; end: Date };
  calendar(command: 'select-date', args: 'start' | 'end' | 'auto'): JQuery;
  button(command: 'disable' | 'hidden'): boolean;
  button(command: 'disable' | 'hidden', state: boolean): JQuery;
}
