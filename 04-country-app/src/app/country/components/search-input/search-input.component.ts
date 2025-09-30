import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {

  value = output<string>()
  placeholder = input('Buscar')
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '')
  debounceTime = input(300)
  initialValue = input<string>('')

  debouceEffect = effect((onCleanup) => {
    const value = this.inputValue() // cada vez que detecte un cambio del signal

    const timeout = setTimeout(() => {
      this.value.emit(value)
    }, this.debounceTime());
    onCleanup (() => {
      clearTimeout(timeout)
    });
  })
}
