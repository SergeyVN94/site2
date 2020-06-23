type CounterValue = {
  text: string;
  value?: number;
};

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface JQuery {
  calendar(command: 'select-date', args: 'start' | 'end' | 'auto'): JQuery;
  button(command: 'disable'): boolean;
  button(command: 'disable', state: boolean): JQuery;
  button(command: 'hidden'): boolean;
  button(command: 'hidden', state: boolean): JQuery;
}
