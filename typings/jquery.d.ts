type CounterValue = {
  text: string;
  value?: number;
};

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface JQuery {
  calendar(command: 'select-date', args: 'start' | 'end' | 'auto'): JQuery;
  button(command: 'disable' | 'hidden'): boolean;
  button(command: 'disable' | 'hidden', state: boolean): JQuery;
}
