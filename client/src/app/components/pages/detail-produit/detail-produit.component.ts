import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';//.prod';
import DataController from '../../../shared/DataController';
import State, { CacheData } from "../../../shared/State";
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { request, gql } from "graphql-request";


@Component({
	selector: 'app-detail-produit',
	templateUrl: './detail-produit.component.html',
	styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit
{

	public product: any = {};
	public p_uid: string = "";

	constructor(private http: HttpClient, private route: ActivatedRoute, private _bottomSheet: MatBottomSheet)
	{
		this.p_uid = this.route.snapshot.paramMap.get('id');

		DataController.getProduct(this.p_uid, (data) =>
		{
			this.product = data
		})
	}

	openBottomSheet(): void {
	  this._bottomSheet.open(BottomNewCommSheet);
	}

	ngOnInit(): void
	{
	}

	addToPanier(): boolean
	{
		if (this.product.stock > 0){
			let alreadyExists = false;
			let panier = State.get(CacheData.Panier);
			for (let item of panier)
			{
				if (item.product.p_uid == this.product.p_uid)
				{
					item.count += 1;
					alreadyExists = true;
				}
			}
			if (!alreadyExists)
			{
				let toCache = {
					count: 1,
					product: this.product,
				}
				panier.push(toCache);
			}

			State.set(CacheData.Panier, panier);
			return true;
		}
		else{
			return false;
		}
	}

	//partie wishlist
	addToWishlist() : any {
		let auth = State.get(CacheData.Auth);
		let alreadyExists = false;
		let wishlist;
		this.getWishlist(auth).then(wish => {wishlist=wish});

		/*for (let item of wishlist)
		{
			if (item.p_uid != this.p_uid)
			{*/
				this.addWish(auth, this.p_uid);
			/*}
			else{
				console.log('déjà présent dans la wishlist');
			}
		}*/
	}

	public getWishlist = async (auth: any) =>
	{
		let query = gql`
		query getWishlist($auth: AuthInfo) {
			getWishlist(auth: $auth)
		}
	`
    let variables = {
      auth: auth
    }
    let wish : any = await request(environment.API + "/graphql", query, variables, { "Content-Type": "application/json" });
    console.log(wish);
    return wish;
	}

	public addWish = async (auth: any, product: string) =>
	{
		let mutation = gql`
		mutation addWish($auth: AuthInfo!, $product: ID!) {
			addToWishlist(auth: $auth, product: $product)
		}
		`
		let variables = {
		auth: auth,
		product: product
		}
		let wish : any = await request(environment.API + "/graphql", mutation, variables, { "Content-Type": "application/json" });
		return wish.addWish;
	}
	//fin wishlist
}

@Component({
	selector: 'new-commentary',
	templateUrl: './new-commentary.component.html',
})
export class BottomNewCommSheet {
	stars = 5;
	commentaryGroup: FormGroup;
	constructor(private _formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.commentaryGroup = this._formBuilder.group({
		  commentary: ['', Validators.required],
		});
	}

	updateStars(i: number): void{
		if (this.stars == i){
			this.stars = 0;
		}
		else{
			this.stars = i;
		}
	}

	post(): void{
		//TODO poster le commentaire
	}

}
