import React from 'react';
import { useRouter } from 'next/router';
import SavedGame from '../../src/components/SavedGame';

export default function SavedGamePage() {
  const router = useRouter();
  const { name } = router.query;

  return <SavedGame name={name as string} />;
}
