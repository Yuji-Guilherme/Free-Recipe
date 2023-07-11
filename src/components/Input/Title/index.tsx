import { MiniLogo } from '@/components/MiniLogo';

import * as S from './style';

function Title() {
  return (
    <S.TitleWrapper>
      <MiniLogo width={30} height={28} />
      <S.Title>Make your own food!</S.Title>
    </S.TitleWrapper>
  );
}

export { Title };
