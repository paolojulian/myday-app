import { colors } from '@/constants/Colors';
import Container from '../Container';
import ThemedText from '../ThemedText';
import ThemedView from '../ThemedView';

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
        {LeftComponent}
        <ThemedText variant="heading">{title}</ThemedText>
        {RightComponent}
      </ThemedView>
    </Container>
  );
}
