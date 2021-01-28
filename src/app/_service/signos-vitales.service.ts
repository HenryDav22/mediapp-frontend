import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { SignosVitales } from '../_model/signosVitales';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignosVitalesService extends GenericService<SignosVitales> {

  private signosCambio = new Subject<SignosVitales[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/signosvitales`
    );
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  getSignosCambio() {
    return this.signosCambio.asObservable();
  }

  setSignosCambio(signos: SignosVitales[]) {
    this.signosCambio.next(signos);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    return this.mensajeCambio.next(mensaje);
  }

}
