import { Component, OnInit } from '@angular/core';
import { CacheData } from '../../../shared/cache';
import Cache from "../../../shared/cache";
import DataController from '../../../shared/DataController';
import { PanierService } from 'src/app/services/panier.service';

@Component({
	selector: 'app-panier',
	templateUrl: './panier.component.html',
	styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit
{
	TabProducts = [];
	ProductTotalValeur;
	products;

	constructor(public panier: PanierService) { 
		
		this.TabProducts = this.panier.getProductFromTab();
		this.products = this.panier.getProductCount();
	}

	ngOnInit(): void
	{
		setInterval(() => {
			this.products = this.panier.getProductCount();
			console.log("Le nombre de produit dans le panier est de :", this.panier);
		}, 30);
	}

	ControlRemoveProduct = (product) => {
		this.panier.RemoveFromTab(product);
		this.TabProducts = this.panier.getProductFromTab();
		this.ProductTotalValeur = this.panier.getTotalPanier();
	}

	ControlIncrement = (product) => {
		this.panier.addProductsToTab(product);
		this.TabProducts = this.panier.getProductFromTab();
		this.ProductTotalValeur = this.panier.getTotalPanier();
	}

	ControlDecrement = (product) => {
		this.panier.MoinsFromTab(product);
		this.TabProducts = this.panier.getProductFromTab();
		this.ProductTotalValeur = this.panier.getTotalPanier();
	}






















	/*panier: any;

	constructor() { }*/

	/*ngOnInit(): void
	{
		this.panier = Cache.get(CacheData.Panier);
	}

	addItem(index: number): void
	{
		this.panier[index].count += 1;
	}

	subItem(index: number): void
	{
		this.panier[index].count -= 1;
		if (this.panier[index].count == 0)
		{
			this.panier.splice(index, 1);
			Cache.set(CacheData.Panier, this.panier);
		}
	}

	delItem(index: number): void
	{
		this.panier.splice(index, 1);
		Cache.set(CacheData.Panier, this.panier);
	}

	acheter(): void
	{
		//TODO fonction acheter qui enlève du stock le nombre de produit acheter
	}
*/
}
