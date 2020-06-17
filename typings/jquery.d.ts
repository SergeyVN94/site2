type CounterValue = {
  text: string;
  value?: number;
};

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface JQuery {
  dropdownHead(command: 'set-theme' | 'remove-theme', theme: string): JQuery;
  dropdownHead(command: 'has-theme', theme: string): boolean;
  dropdownHead(command: 'text', text: string): JQuery;
  dropdownHead(command: 'text'): string;
  dropdownCounter(command: 'value'): number;
  dropdownCounter(command: 'value', value: number): JQuery;
  dropdownCounter(command: 'group'): string;
  dropdownCounter(command: 'reset'): JQuery;
  calendar(command: 'select-date', args: 'start' | 'end'): JQuery;
  button(command: 'disable'): boolean;
  button(command: 'disable', state: boolean): JQuery;
  button(command: 'hidden'): boolean;
  button(command: 'hidden', state: boolean): JQuery;
}
