let orderCounter = 3;

let selectedRow = null;

// SAVE ORDER
document.getElementById("saveOrderBtn").addEventListener("click", function () {

    const customer = document.getElementById("customerName").value;
    const phone = document.getElementById("phoneNumber").value;
    const platform = document.getElementById("platform").value;
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const date = document.getElementById("dateOrdered").value;
    const status = document.getElementById("status").value;

    if(customer=="" || product=="" || quantity=="" || price==""){
        alert("Please complete all fields.");
        return;
    }

    const table = document.getElementById("ordersTable");

    const row = table.insertRow();

    row.innerHTML=`

    <td>ORD-${String(orderCounter).padStart(4,'0')}</td>

    <td>${customer}</td>

    <td>${platform}</td>

    <td>${quantity} ${product}</td>

    <td>${date}</td>

    <td>₱${price}</td>

    <td>
        <span class="badge bg-warning">
            ${status}
        </span>
    </td>

    <td>

    <button
    class="btn btn-primary btn-sm"
    onclick="viewOrder(this)">
    View
    </button>

    <button
    class="btn btn-success btn-sm"
    onclick="editOrder(this)">
    Edit
    </button>

    <button
    class="btn btn-danger btn-sm"
    onclick="deleteOrder(this)">
    Delete
    </button>

    </td>

    `;

    orderCounter++;

    document.getElementById("customerName").value="";
    document.getElementById("phoneNumber").value="";
    document.getElementById("product").value="";
    document.getElementById("quantity").value="";
    document.getElementById("price").value="";
    document.getElementById("notes").value="";
    document.getElementById("dateOrdered").value="";

    bootstrap.Modal.getInstance(document.getElementById("newOrderModal")).hide();

});

// VIEW

function viewOrder(btn){

    const row = btn.parentElement.parentElement;

    alert(

`Order ID : ${row.cells[0].innerText}

Customer : ${row.cells[1].innerText}

Platform : ${row.cells[2].innerText}

Product : ${row.cells[3].innerText}

Date : ${row.cells[4].innerText}

Total : ${row.cells[5].innerText}

Status : ${row.cells[6].innerText}`

);

}

// EDIT

function editOrder(btn){

    selectedRow = btn.parentElement.parentElement;

    document.getElementById("editCustomer").value =
    selectedRow.cells[1].innerText;

    document.getElementById("editDate").value =
    selectedRow.cells[4].innerText;

    document.getElementById("editStatus").value =
    selectedRow.cells[6].innerText;

    new bootstrap.Modal(
        document.getElementById("viewModal")
    ).show();

}

// SAVE EDIT

document.getElementById("updateOrderBtn").addEventListener("click",function(){

    selectedRow.cells[1].innerText=
    document.getElementById("editCustomer").value;

    selectedRow.cells[4].innerText=
    document.getElementById("editDate").value;

    selectedRow.cells[6].innerHTML=

    `<span class="badge bg-warning">

    ${document.getElementById("editStatus").value}

    </span>`;

    bootstrap.Modal.getInstance(
        document.getElementById("viewModal")
    ).hide();

});

// DELETE

function deleteOrder(btn){

    if(confirm("Delete this order?")){

        btn.parentElement.parentElement.remove();

    }

}

// DELETE INSIDE EDIT MODAL

document.getElementById("deleteOrderBtn").addEventListener("click",function(){

    if(confirm("Delete this order?")){

        selectedRow.remove();

        bootstrap.Modal.getInstance(
            document.getElementById("viewModal")
        ).hide();

    }

});

// SEARCH

document.getElementById("searchInput").addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const rows=document.querySelectorAll("#ordersTable tr");

    rows.forEach(row=>{

        row.style.display=

        row.innerText.toLowerCase().includes(value)

        ? ""

        : "none";

    });

});
