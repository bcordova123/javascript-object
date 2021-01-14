class Product{
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {

    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = ` 
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre del producto</strong>: ${product.name}
                    <strong>Precio del producto</strong>: ${product.price}
                    <strong>Año del producto</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        this.resetForm();

    }
    resetForm(){
        document.getElementById('product-form').reset();
    }
    
    deleteProduct(element){
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado exitosamente', 'info');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        //Mostrando en el DOM
        //querySelector obtiene el primer elemento con el nombre de la clase a buscar el . es clase y el # es id 
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        //Temporizador de milisegundos
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

//DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function(e){
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        //Creando la instancia de la clase Product
        const product = new Product(name, price, year);
        //Creando la instancia de la clase UI
        const ui = new UI();

        if (name === '' || price === '' || year === '') {
           return ui.showMessage('Completa los campos', 'danger');
        }
        //Usando metodos de la clase
        ui.addProduct(product);
        ui.showMessage('Producto agregado exitosamente', 'success');
        //Evita recargar la pagina
        e.preventDefault();
    });

document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
    
})