import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, retry, switchMap, tap, throwError } from 'rxjs';
import { BuscacepService } from 'src/app/services/buscacep.service';

const PAUSA = 500;

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css']
})
export class CepComponent implements OnInit {

  campoBusca = new FormControl();
  cep = '';
  cepResultado: any = '';
  mensagemErro: string | null = '';
  cepEncontrado: string | null = '';

  constructor(private service: BuscacepService) { }

  ngOnInit(): void {
  }

  cepEncontrado$ = this.campoBusca.valueChanges
        .pipe(
          debounceTime(PAUSA),
          filter((valorDigitado) => valorDigitado.length >= 3),
          tap((valorDigitado) => console.log(valorDigitado)),
          distinctUntilChanged(),
          switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
          map(resultado => {
            // Define a variável mensagemErro como null quando a busca é bem-sucedida
            this.mensagemErro = null;
            return this.cepResultado = resultado;
          }),
          catchError(() => {
            this.cepResultado = {};
            return throwError(() => new Error(this.mensagemErro = 'Erro ao buscar CEP!'));
          }),
          retry()
        )

  buscar(cep: string) {
    this.service.buscar(cep).subscribe((resultado) => console.log(resultado));

  }


}
