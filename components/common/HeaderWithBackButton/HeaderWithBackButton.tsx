import { MaterialCommunityIcons } from '@expo/vector-icons';
import PageHeader from '../PageHeader';
import { PageHeaderProps } from '../PageHeader/PageHeader';

type HeaderWithBackButtonProps = {
  onBackPress: () => void;
} & Pick<PageHeaderProps, 'RightComponent' | 'title'>;

export default function HeaderWithBackButton({
  onBackPress,
  ...pageHeaderProps
}: HeaderWithBackButtonProps) {
  return (
    <PageHeader
      LeftComponent={
        <MaterialCommunityIcons name={'chevron-left'} size={32} onPress={onBackPress} />
      }
      {...pageHeaderProps}
    />
  );
}
