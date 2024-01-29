let dataTable;
let dataTableIsInitialized=false;


const dataTableConfiguration = {
    
    scrollX: "2500px",
    lengthMenu: [4, 10, 20],
    columnDefs:[
        {orderable: false, target: [0, 2, 4, 5, 6]},
        {searchable: false, target: [0, 1, 3, 4, 6, 7, 8]},
        {className: "centered", target:[0, 1, 3, 5, 6, 7, 8]},
        
        
    ],
   

    dom: "Blfrtip",
    
    buttons: [

            
        {
            extend: "excelHtml5",
            text: "<i class='fa-solid fa-file-csv'></i>",
            titleAttr: "Download Excel file",
            className: "btn btn-success",
            
        },

        {
        extend: "pdfHtml5",
            text: "<i class='fa-solid fa-file-pdf'></i>",
            titleAttr: "Download PDF",
            className: "btn btn-danger",
            
        },

        {
            extend: "print",
                text: "<i class='fa-solid fa-print'></i>",
                titleAttr: "Print",
                className: "btn btn-cancel",
                
            },

    ],

    destroy: true,
};
const initDataTable = async() => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listProducts();

    dataTable=$("#datatable_products").DataTable(dataTableConfiguration);
    dataTableIsInitialized = true;
};
const listProducts = async() => {
    try{
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        
        let content=``;
        products.forEach((product, index) => {
         content += `
         <tr>
            <td class="table-checkbox"><input type="checkbox" name="" id=""></td>
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td><a href="#" onclick="showImageAlert('${product.image}','${product.title}'); return false;"><i class="fa-solid fa-magnifying-glass"></i></a></td>
            <td>${product.rating.rate}</td>
            <td>${product.rating.count}</td>
         </tr>`;   
        });
        tableBody_products.innerHTML = content;
    }catch(ex){
        alert(ex);
    }
};

const showImageAlert = (imageUrl,title) => {
    Swal.fire({
        title: title,
        confirmButtonText: "Thanks!",
        imageUrl: imageUrl,
        imageWidth: 280,
        imageHeight: 280,
        showCloseButton: true,
    });
};
window.addEventListener("load", async()=>{
    await initDataTable();
});
