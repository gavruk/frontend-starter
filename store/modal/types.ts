export interface IStackItem {
  id: string;
  name: string;
  component: React.ReactElement;
  props: any;
  isOpened: boolean;
  dependant: boolean;
}

export interface IModalProviderState {
  stack: IStackItem[];
}
