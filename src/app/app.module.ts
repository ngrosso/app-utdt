import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { MateriasComponent } from './materias/materias.component';
import { DetalleComponent } from './detalle/detalle.component';
import { MateriaService } from './materia.service';
import { InputFilterPipe } from './input-filter.pipe';
import { HorariosComponent } from './horarios/horarios.component';
import { CalendarioComponent } from './calendario/calendario.component';


@NgModule({
  declarations: [
    AppComponent,
    DetalleComponent,
    MateriasComponent,
    InputFilterPipe,
    HorariosComponent,
    CalendarioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [MateriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
