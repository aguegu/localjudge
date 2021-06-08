#include <iostream>
#include <cstdint>
using namespace std;

int main(void) {
  uint16_t l, m;
  cin >> l >> m;
  uint8_t points[l + 1] = {}; // filled with 0

  for (uint16_t i = 0; i < m; i++) {
    uint16_t start, end;
    cin >> start >> end;
    for (uint16_t j = start; j <= end && j <= l; j++) {
      points[j]++;
    }
  }

  uint16_t result = 0;
  for (uint16_t k = 0; k <= l; k++ ) {
    if (!points[k]) {
      result++;
    }
  }

  cout << result;

  return 0;
}
