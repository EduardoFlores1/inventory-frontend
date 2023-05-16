import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

    //Un objeto MediaQueryList almacena información sobre una consulta multimedia aplicada a un documento
    mobileQuery: MediaQueryList;

    menuNav = [
        {name: 'Home', route: 'home', icon: 'home'},
        {name: 'Categorías', route: 'home', icon: 'category'},
        {name: 'Productos', route: 'home', icon: 'production_quantity_limits'}
    ];

    constructor(media: MediaMatcher) {
        //El objeto resultante controla el envío de notificaciones a los agentes de escucha cuando cambia 
        //el estado de la consulta multimedia
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
     }

    ngOnInit(): void {
    }

}
