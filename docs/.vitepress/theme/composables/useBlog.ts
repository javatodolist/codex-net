import { computed, ref, type Ref, type ComputedRef, unref } from 'vue'
import type { ArticleData } from '../utils/blogData.data'

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>

export function usePagination(items: MaybeRef<ArticleData[]>, pageSize = 20) {
  const currentPage = ref(1)

  const resolvedItems = computed(() => unref(items))

  const totalPages = computed(() => Math.ceil(resolvedItems.value.length / pageSize))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return resolvedItems.value.slice(start, start + pageSize)
  })

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function resetPage() {
    currentPage.value = 1
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    resetPage,
  }
}
