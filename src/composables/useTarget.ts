import { useStorage } from '@vueuse/core';
import { Ref } from 'vue';

import {
  Language,
  Library,
  LANGUAGE_JSON,
  LIBRARY_VANILLA,
} from '@/utils/targets';

interface Target {
  language: Language;
  library: Library;
}

interface UseTarget {
  target: Ref<Target>;
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
