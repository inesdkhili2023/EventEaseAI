import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-e-products-list',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf],
    templateUrl: './e-products-list.component.html',
    styleUrl: './e-products-list.component.scss'
})
export class EProductsListComponent {

    displayedColumns: string[] = ['product', 'category', 'price', 'ratings', 'stock', 'totalOrders', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    product: any;
    category: string;
    price: string;
    ratings: any;
    stock: string;
    totalOrders: string;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        product: {
            img: 'assets/images/products/product15.jpg',
            title: 'Comforta Armchair'
        },
        category: 'Furniture',
        price: '$300',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '3250'
        },
        stock: 'Out of Stock',
        totalOrders: '13k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product16.jpg',
            title: 'Comforta Sofa EDM'
        },
        category: 'Furniture',
        price: '$550',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '1800'
        },
        stock: '2.5k',
        totalOrders: '32.8k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product17.jpg',
            title: 'Electric Bicycle'
        },
        category: 'Bicycle',
        price: '$4,000',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '5620'
        },
        stock: '401',
        totalOrders: '14k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product18.jpg',
            title: 'Sport Shoes'
        },
        category: 'Shoe',
        price: '$220',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '1905'
        },
        stock: '1.5k',
        totalOrders: '0.56k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product19.jpg',
            title: 'Straw Hat'
        },
        category: 'Fashion',
        price: '$560',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '308'
        },
        stock: 'Out of Stock',
        totalOrders: '1.8k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product20.jpg',
            title: 'Sofa Sculpt'
        },
        category: 'Furniture',
        price: '$1100',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '660'
        },
        stock: '0.8k',
        totalOrders: '42',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product21.jpg',
            title: 'Urban Carry'
        },
        category: 'Bag',
        price: '$1390',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '1230'
        },
        stock: '3.25k',
        totalOrders: '4.22k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product22.jpg',
            title: 'Elegance Steps'
        },
        category: 'Shoe',
        price: '$80',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '780'
        },
        stock: '0.66k',
        totalOrders: '1.05k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product23.jpg',
            title: 'Urban Chic Pants'
        },
        category: 'Fashion',
        price: '$1950',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '1486'
        },
        stock: '12.8k',
        totalOrders: '2.8k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product24.jpg',
            title: 'Moda Motion'
        },
        category: 'Shoe',
        price: '$400',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '60'
        },
        stock: 'Out of Stock',
        totalOrders: '120',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product24.jpg',
            title: 'Moda Motion'
        },
        category: 'Shoe',
        price: '$400',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '60'
        },
        stock: 'Out of Stock',
        totalOrders: '120',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product23.jpg',
            title: 'Urban Chic Pants'
        },
        category: 'Fashion',
        price: '$1950',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '1486'
        },
        stock: '12.8k',
        totalOrders: '2.8k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product22.jpg',
            title: 'Elegance Steps'
        },
        category: 'Shoe',
        price: '$80',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '780'
        },
        stock: '0.66k',
        totalOrders: '1.05k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product21.jpg',
            title: 'Urban Carry'
        },
        category: 'Bag',
        price: '$1390',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '1230'
        },
        stock: '3.25k',
        totalOrders: '4.22k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product20.jpg',
            title: 'Sofa Sculpt'
        },
        category: 'Furniture',
        price: '$1100',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '660'
        },
        stock: '0.8k',
        totalOrders: '42',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product19.jpg',
            title: 'Straw Hat'
        },
        category: 'Fashion',
        price: '$560',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '308'
        },
        stock: 'Out of Stock',
        totalOrders: '1.8k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product18.jpg',
            title: 'Sport Shoes'
        },
        category: 'Shoe',
        price: '$220',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '1905'
        },
        stock: '1.5k',
        totalOrders: '0.56k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product17.jpg',
            title: 'Electric Bicycle'
        },
        category: 'Bicycle',
        price: '$4,000',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '5620'
        },
        stock: '401',
        totalOrders: '14k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product16.jpg',
            title: 'Comforta Sofa EDM'
        },
        category: 'Furniture',
        price: '$550',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '1800'
        },
        stock: '2.5k',
        totalOrders: '32.8k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        product: {
            img: 'assets/images/products/product15.jpg',
            title: 'Comforta Armchair'
        },
        category: 'Furniture',
        price: '$300',
        ratings: {
            star: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            totalRatings: '3250'
        },
        stock: 'Out of Stock',
        totalOrders: '13k',
        action: {
            view: 'ri-eye-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    }
];