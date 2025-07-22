import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: any[] = [];
  searchText = new FormControl();
  filteredProducts: any;
  isExpanded: boolean = false;
  priceSortOrder: 'asc' | 'desc' | null = null;

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'title', header: 'title' },
    { field: 'description', header: 'Description' },
    { field: 'category', header: 'Category' },
    { field: 'price', header: 'Price(USD)' },
    { field: 'image', header: 'Image' },


  ];
  constructor(private productsService: ProductsService) {
    // Initialization logic can go here
  }

  ngOnInit() {
    this.getProductsDetails();
  }

  getProductsDetails() {
    this.productsService.getProducts().subscribe(
      {
        next: (response) => {
          this.products = response.products;
          this.filteredProducts = [...this.products];
          this.searchText.valueChanges
            .pipe(
              debounceTime(2000),
              distinctUntilChanged()
            )
            .subscribe((searchTerm: string) => {
              this.filteredProducts = this.products.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
              );
            });
          console.log('Products fetched successfully:', this.products);
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      }
    )
  }

  toggleExpand(event: Event): void {
    event.preventDefault(); // prevent anchor default
    this.isExpanded = !this.isExpanded;
  }

  sortByPrice() {
    if (this.priceSortOrder === null) {
      this.filteredProducts = [...this.products].sort((a, b) => a.price - b.price);
      this.priceSortOrder = 'asc';
    } else if (this.priceSortOrder === 'asc') {
      this.filteredProducts = [...this.products].sort((a, b) => b.price - a.price);
      this.priceSortOrder = 'desc';
    } else {
      this.filteredProducts = [...this.products]; // Reset to original order
      this.priceSortOrder = null;
    }
  }
}
