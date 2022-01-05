import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';//.prod';
import DataController from '../../../shared/DataController';
import { data } from '../../../shared/global'


@Component({
	selector: 'app-resultats',
	templateUrl: './resultats.component.html',
	styleUrls: ['./resultats.component.css']
})
export class ResultatsComponent implements OnInit
{
	rech = "";
	cat ="";
	products = [];
	totalCount = 0;
	actualSort = "NO_SORT";
	possibleSorts = ["NO_SORT", "LETTER_ASCENDING", "LETTER_DESCENDING", "PRICE_ASCENDING", "PRICE_DESCENDING"];
	toTextPossibleSorts = ["---", "A-Z", "Z-A", "Prix Croissant", "Prix Décroissant"];
	DATA = data;
	pageIndex = 0;
	pageSize = 16;

	constructor(private route: ActivatedRoute, private router: Router)
	{
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	ngOnInit(): void
	{
		console.log(this.rech);
		this.refreshProducts(0, 16);
	}

	public refreshProducts(pageIndex: number, pageSize: number)
	{

		this.rech = this.route.snapshot.queryParams.str;
		this.cat = this.route.snapshot.queryParams.cat;
		
		let offset = pageIndex * pageSize;

		DataController.searchProduct(this.rech, this.cat, pageSize, offset, this.DATA.actualSort, this.DATA.filter, (data) =>
		{
			this.totalCount = data.meta.totalCount;
			this.products = data.results.map(product =>
			{
				if (product['description'].length > 40)
				{
					product['description'] = product['description'].substring(0, 37) + "...";
				}
				return product;
			})
		});
	}

	public getServerData(event?: PageEvent)
	{
		this.pageIndex = event.pageIndex;
		this.pageSize = event.pageSize;
		this.refreshProducts(event.pageIndex, event.pageSize);
	}

}
