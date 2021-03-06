export interface Timer {
  id?: string;
  name: string;
  color: string;
  running: boolean;
  order?: number;
}

export function generateMockTimer(): Timer {
  return {
    id: '1',
    name: 'My timer 1',
    color: '#f00',
    running: false,
    order: 0
  };
}
