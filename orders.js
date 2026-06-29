import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const ordersCollection = collection(db,"orders");

const saveBtn=document.getElementById("saveOrderBtn");

saveBtn.addEventListener("click",saveOrder);

async function saveOrder(){

const customer=document.getElementById("customerName").value;
const phone=document.getElementById("phoneNumber").value;
const platform=document.getElementById("platform").value;
const product=document.getElementById("product").value;
const quantity=document.getElementById("quantity").value;
const price=document.getElementById("price").value;
const date=document.getElementById("dateOrdered").value;
const status=document.getElementById("status").value;
const notes=document.getElementById("notes").value;

if(customer==""||product==""){

alert("Complete the form.");

return;

}

await addDoc(ordersCollection,{

customer,

phone,

platform,

product,

quantity,

price,

date,

status,

notes

});

alert("Order Saved!");

bootstrap.Modal.getInstance(

document.getElementById("newOrderModal")

).hide();

clearForm();

loadOrders();

}

function clearForm(){

document.getElementById("customerName").value="";
document.getElementById("phoneNumber").value="";
document.getElementById("product").value="";
document.getElementById("quantity").value="";
document.getElementById("price").value="";
document.getElementById("dateOrdered").value="";
document.getElementById("notes").value="";

}
async function loadOrders(){

    const snapshot = await getDocs(ordersCollection);

    const table = document.getElementById("ordersTable");

    table.innerHTML = "";

    let number = 1;

    snapshot.forEach((doc)=>{

        const order = doc.data();

        table.innerHTML += `

        <tr data-id="${doc.id}">

            <td>ORD-${String(number).padStart(4,"0")}</td>

            <td>${order.customer}</td>

            <td>${order.platform}</td>

            <td>${order.quantity} ${order.product}</td>

            <td>${order.date}</td>

            <td>₱${order.price}</td>

            <td>

                <span class="badge bg-warning">

                    ${order.status}

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

        </tr>

        `;

        number++;

    });

}

loadOrders();
import {
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let selectedDocId = null;
let selectedRow = null;

// VIEW
window.viewOrder = function(button){

    const row = button.closest("tr");

    alert(
`Order ID: ${row.cells[0].innerText}

Customer: ${row.cells[1].innerText}

Platform: ${row.cells[2].innerText}

Product: ${row.cells[3].innerText}

Date Ordered: ${row.cells[4].innerText}

Total: ${row.cells[5].innerText}

Production Status: ${row.cells[6].innerText}`
    );

};

// EDIT
window.editOrder = function(button){

    selectedRow = button.closest("tr");
    selectedDocId = selectedRow.dataset.id;

    document.getElementById("editCustomer").value =
        selectedRow.cells[1].innerText;

    document.getElementById("editDate").value =
        selectedRow.cells[4].innerText;

    document.getElementById("editStatus").value =
        selectedRow.cells[6].innerText.trim();

    new bootstrap.Modal(
        document.getElementById("viewModal")
    ).show();

};

// SAVE CHANGES
document.getElementById("updateOrderBtn").addEventListener("click", async ()=>{

    if(!selectedDocId) return;

    await updateDoc(doc(db,"orders",selectedDocId),{

        customer: document.getElementById("editCustomer").value,

        date: document.getElementById("editDate").value,

        status: document.getElementById("editStatus").value

    });

    bootstrap.Modal.getInstance(
        document.getElementById("viewModal")
    ).hide();

    loadOrders();

});

// DELETE
window.deleteOrder = async function(button){

    if(!confirm("Delete this order?")) return;

    const row = button.closest("tr");

    const id = row.dataset.id;

    await deleteDoc(doc(db,"orders",id));

    loadOrders();

};

// DELETE FROM EDIT MODAL
document.getElementById("deleteOrderBtn").addEventListener("click",async()=>{

    if(!selectedDocId) return;

    if(!confirm("Delete this order?")) return;

    await deleteDoc(doc(db,"orders",selectedDocId));

    bootstrap.Modal.getInstance(
        document.getElementById("viewModal")
    ).hide();

    loadOrders();

});

// SEARCH
document.getElementById("searchInput").addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    document.querySelectorAll("#ordersTable tr").forEach(row=>{

        row.style.display =
            row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";

    });

});
