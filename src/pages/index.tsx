import { useEffect } from 'react';

import { useAppNavigation } from 'components/navigation';

export default function Home() {
  const { goToAppeals } = useAppNavigation();

  useEffect(() => {
    goToAppeals();
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
