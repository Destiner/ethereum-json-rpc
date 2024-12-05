import { type RemovableRef, useStorage } from '@vueuse/core';

import {
  type Language,
  type Library,
  LANGUAGE_JSON,
  LIBRARY_VANILLA,
} from '@/utils/targets';

interface Target {
  language: Language;
  library: Library;
}

interface UseTarget {
  target: RemovableRef<Target>;
}

const STORAGE_KEY_TARGET = 'target';

function useTarget(): UseTarget {
  const target = useStorage<Target>(STORAGE_KEY_TARGET, {
    language: LANGUAGE_JSON,
    library: LIBRARY_VANILLA,
  });

  return {
    target,
  };
}

export default useTarget;
