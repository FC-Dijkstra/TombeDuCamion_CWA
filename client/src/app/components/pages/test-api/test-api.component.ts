import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";//.prod";
import DataController from '../../../shared/DataController';

@Component({
	selector: 'app-test-api',
	templateUrl: './test-api.component.html',
	styleUrls: ['./test-api.component.css']
})

@Injectable()
export class TestApiComponent implements OnInit
{
	public product: any = {};
	constructor(private http: HttpClient)
	{
		/*
		// @see https://www.telerik.com/blogs/graphql-angular-how-to-make-a-graphql-query
		let id = '000';
		let query = `{
			product(p_uid:\"${id}\"){
			p_uid
			seller
			title
			stock
			description
			images
			comments
			}
		}`;
		let variables = null;
		this.http.post(environment.API + "/graphql?", JSON.stringify({ query, variables }),
			{ headers: { "Content-Type": "application/json", }, observe: "body", responseType: "json" }
		)
			.subscribe(
				(data) =>
				{
					data = data['data']['product']
					this.product = data;
				});*/

		DataController.testApi((data) =>
		{
			this.product = data.product;

		});
	}

	ngOnInit(): void
	{
	}

}
