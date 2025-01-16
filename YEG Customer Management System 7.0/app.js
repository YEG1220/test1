// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkIzyJ_dqm1uE6vyxYj0nSoROoLv5A2oo",
  authDomain: "yeg2-31e6e.firebaseapp.com",
  databaseURL: "https://yeg2-31e6e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yeg2-31e6e",
  storageBucket: "yeg2-31e6e.firebasestorage.app",
  messagingSenderId: "92507981715",
  appId: "1:92507981715:web:57a15c03e6bdb0519a4a66",
  measurementId: "G-45DD2PGT1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to load client data
function loadClientData() {
    const clientRef = ref(database, 'clients/1'); // 假设您要读取 ID 为 1 的客户数据
    onValue(clientRef, (snapshot) => {
        const data = snapshot.val();
        const clientDataDiv = document.getElementById("client-data");
        clientDataDiv.innerHTML = data ? `
            <p>Name: ${data.name}</p>
            <p>Age: ${data.age}</p>
            <p>Email: ${data.email}</p>
        ` : "<p>No data available</p>";
    });
}

// Function to load spouse data
function loadSpouseData() {
    const spouseRef = ref(database, 'spouse/1'); // 假设您要读取 ID 为 1 的配偶数据
    onValue(spouseRef, (snapshot) => {
        const data = snapshot.val();
        const spouseDataDiv = document.getElementById("spouse-data");
        spouseDataDiv.innerHTML = data ? `
            <p>Name: ${data.name}</p>
            <p>Age: ${data.age}</p>
            <p>Email: ${data.email}</p>
        ` : "<p>No data available</p>";
    });
}

// Function to load children data
function loadChildrenData() {
    const childrenRef = ref(database, 'children/'); // 假设您要读取所有子女数据
    onValue(childrenRef, (snapshot) => {
        const data = snapshot.val();
        const childrenDataDiv = document.getElementById("children-data");
        childrenDataDiv.innerHTML = data ? Object.keys(data).map(key => `
            <p>Name: ${data[key].name}</p>
            <p>Age: ${data[key].age}</p>
            <p>Email: ${data[key].email}</p>
        `).join('') : "<p>No data available</p>";
    });
}

// Function to add a new client
document.getElementById("add-client").addEventListener("click", () => {
    const name = document.getElementById("client-name").value;
    const age = document.getElementById("client-age").value;
    const email = document.getElementById("client-email").value;

    const clientData = {
        name: name,
        age: age,
        email: email
    };

    set(ref(database, 'clients/1'), clientData) // 假设您要写入 ID 为 1 的客户数据
        .then(() => {
            console.log('Client data saved successfully!');
            loadClientData(); // 重新加载数据
            // 清空输入框
            document.getElementById("client-name").value = '';
            document.getElementById("client-age").value = '';
            document.getElementById("client-email").value = '';
        })
        .catch((error) => {
            console.error('Error saving client data:', error);
        });
});

// Function to add a new spouse
document.getElementById("add-spouse").addEventListener("click", () => {
    const name = document.getElementById("spouse-name").value;
    const age = document.getElementById("spouse-age").value;
    const email = document.getElementById("spouse-email").value;

    const spouseData = {
        name: name,
        age: age,
        email: email
    };

    set(ref(database, 'spouse/1'), spouseData) // 假设您要写入 ID 为 1 的配偶数据
        .then(() => {
            console.log('Spouse data saved successfully!');
            loadSpouseData(); // 重新加载数据
            // 清空输入框
            document.getElementById("spouse-name").value = '';
            document.getElementById("spouse-age").value = '';
            document.getElementById("spouse-email").value = '';
        })
        .catch((error) => {
            console.error('Error saving spouse data:', error);
        });
});

// Function to add a new child
document.getElementById("add-child").addEventListener("click", () => {
    const name = document.getElementById("child-name").value;
    const age = document.getElementById("child-age").value;
    const email = document.getElementById("child-email").value;

    const childData = {
        name: name,
        age: age,
        email: email
    };

    const newChildRef = ref(database, 'children/' + Date.now()); // 使用时间戳作为子女 ID
    set(newChildRef, childData)
        .then(() => {
            console.log('Child data saved successfully!');
            loadChildrenData(); // 重新加载数据
            // 清空输入框
            document.getElementById("child-name").value = '';
            document.getElementById("child-age").value = '';
            document.getElementById("child-email").value = '';
        })
        .catch((error) => {
            console.error('Error saving child data:', error);
        });
});

// Load data on page load
loadClientData();
loadSpouseData();
loadChildrenData();