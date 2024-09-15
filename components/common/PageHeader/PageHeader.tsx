import { colors } from '@/constants/Colors';
import Container from '../Container';
import ThemedText from '../ThemedText';
import ThemedView from '../ThemedView';
import { View } from 'react-native';
import { ReactElement, ReactNode } from 'react';

export type PageHeaderProps = {
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  title: string;
};

export default function PageHeader({ title, LeftComponent, RightComponent }: PageHeaderProps) {
  return (
    <Container>
      <ThemedView
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 16,
          backgroundColor: colors.v2.black,
        }}
      >
        <PageHeaderEdges placement="start">{LeftComponent}</PageHeaderEdges>
        <ThemedText style={{ flex: 1, textAlign: 'center' }} variant="heading">
          {title}
        </ThemedText>
        <PageHeaderEdges placement="end">{RightComponent}</PageHeaderEdges>
      </ThemedView>
    </Container>
  );
}

function PageHeaderEdges({
  children,
  placement,
}: {
  children: ReactNode;
  placement: 'start' | 'end';
}): ReactElement {
  return (
    <View
      style={{
        width: 48,
        alignItems: placement === 'start' ? 'flex-start' : 'flex-end',
      }}
    >
      {children}
    </View>
  );
}
