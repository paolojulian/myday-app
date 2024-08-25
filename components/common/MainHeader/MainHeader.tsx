import Container from '@/components/common/Container';
import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

type Props = {
  subtitle: string;
  title?: string;
  color?: string;
};

function MainHeader({ subtitle, title = 'My Day', color = colors.v2.white }: Props) {
  return (
    <Container
      style={{
        backgroundColor: colors.v2.black,
        paddingTop: 16,
        paddingBottom: 24,
        zIndex: 10,
      }}
    >
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack>
          <ThemedText variant="title-lg" style={{ color }}>
            {title}
          </ThemedText>
          <ThemedText variant="title-md" style={{ color, opacity: 0.6 }}>
            {subtitle}
          </ThemedText>
        </Stack>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/icons/cog-icon.png')}
            style={{
              width: 32,
              height: 32,
            }}
          />
        </TouchableOpacity>
      </Row>
    </Container>
  );
}

export default MainHeader;
