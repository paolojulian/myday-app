import { MaterialCommunityIcons } from '@expo/vector-icons';
import PageHeader from '../PageHeader';
import { PageHeaderProps } from '../PageHeader/PageHeader';
import { View } from 'react-native';
import { colors } from '@/constants/Colors';

type HeaderWithBackButtonProps = {
  onBackPress: () => void;
} & Pick<PageHeaderProps, 'RightComponent' | 'title'>;

export default function HeaderWithBackButton({
  onBackPress,
  ...pageHeaderProps
}: HeaderWithBackButtonProps) {
  return (
    <View style={{ zIndex: 1, paddingBottom: 8, backgroundColor: colors.v2.black }}>
      <PageHeader
        LeftComponent={
          <MaterialCommunityIcons
            color={colors.v2.white}
            name={'chevron-left'}
            size={32}
            onPress={onBackPress}
          />
        }
        {...pageHeaderProps}
      />
    </View>
  );
}
