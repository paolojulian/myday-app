import { ReactNode } from 'react';

type ConditionalRenderProps = {
  shouldRender: boolean;
  component: ReactNode;
  fallbackComponent?: ReactNode;
};

export default function ConditionalRender({
  shouldRender,
  component,
  fallbackComponent = null,
}: ConditionalRenderProps) {
  return shouldRender ? component : fallbackComponent;
}
