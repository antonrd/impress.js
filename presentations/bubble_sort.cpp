void BubbleSort(int* array, int size) {
  while (true) {
    bool swapped_elements = false;
    for (int i = 1; i < size; i++) {
      if (array[i-1] > array[i]) {
        int temp = array[i-1];
        array[i-1] = array[i];
        array[i] = temp;
        swapped_elements = true;
      }
    }

    if (!swapped_elements) {
      break;
    }
  }
}
