import React from 'react';
import { useRouter } from 'next/router';
import SharedGame from '../../../../src/components/SharedGame';

export default function SharedGamePage() {
  const router = useRouter();
  const { dimensions, content } = router.query;

  return (
    <SharedGame
      dimensions={dimensions as string}
      content={content as string}
    />
  );
}
