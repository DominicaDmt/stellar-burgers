import { FC } from 'react';
import { OrderStatusUI } from '@ui';

interface OrderStatusProps {
  status: string;
}

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  let text = '';
  let textStyle = '';

  switch (status) {
    case 'done':
      text = 'Выполнен';
      textStyle = '#00cccc';
      break;
    case 'pending':
      text = 'Готовится';
      textStyle = '#ffffff';
      break;
    case 'created':
      text = 'Создан';
      textStyle = '#ffffff';
      break;
    default:
      text = 'Отменён';
      textStyle = '#e52b2b';
  }

  return <OrderStatusUI text={text} textStyle={textStyle} />;
};
