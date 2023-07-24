import Avatar from '@mui/material/Avatar';

export const userRows = [
  { id: 1242, imgSrc: "https://szotam.pl/wp-content/uploads/2017/03/pazdzioch2.jpg", fullName: "Marian Paździoch", email: "paździoch123@gmail.com", age: 72, status: "active" },
  { id: 1542, imgSrc: "https://img.wprost.pl/_thumb/9f/97/34afa791107424ca68d923889259.jpeg", fullName: "Ferdek Kiepski", email: "ferdziu_@gmail.com", age: 64, status: "active" },
  { id: 911, imgSrc: "https://s3.party.pl/newsy/bartosz-zukowski-aktor-grajacy-waldusia-kiepskiego-w-serialu-swiat-wedlug-kiepskich-560449-4_3.jpg", fullName: "Waldek Kiepski", email: "waldziuL@gmail.com", age: 32, status: "inactive" },
  { id: 921, imgSrc: "https://i.ytimg.com/vi/TWwxCODgzok/sddefault.jpg", fullName: "Pan Orzeł", email: "orzeł_997@menelovo.pl", age: 58, status: "inactive" },
  { id: 666, imgSrc: "https://kiepscy.org.pl/wp-content/uploads/2013/06/babka.jpg", fullName: "Babka", email: "babunia_c@wp.pl", age: 78, status: "passive" },
]

export const userColumns = [
  { field: "id", headerName: "ID",  width: 100, },
  { 
    field: 'user', 
    headerName: 'User', 
    width: 250,
    renderCell: (params) => {
      return (
        <div style={{ display: 'flex', gap: '4px' }} className="user__row">
          {/* <img className="row__img" src={params.row?.imgSrc} alt="img"></img> */}
          <Avatar alt={Date.now()} src={params.row?.avatarUrl ? `http://localhost:8000/uploads/users/${params.row?.avatarUrl}` : null} style={{ width: '28px', height: '28px', cursor: 'pointer' }}/>
          <h3>{params.row?.firstName}{" "}{params.row?.secondName}</h3>
        </div>
      )
    } 
  },
  { field: 'email', headerName: 'Email', width: 200 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 60,
  // },
  // {
  //   field: 'status',
  //   headerName: "Status",
  //   width: 100,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cell__status ${params.row.status}`}>{params.row.status}</div>
  //     )
  //   }
  // },
]

export const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'BookNow Line Chart'
    },
  },
};

export const lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];

export const bookingsData = [2500, 1900, 1723, 2100, 2974, 3459];
export const bookingsData2k21 = [1252, 1769, 1963, 2424, 2574, 3209];
export const newUsersData = [750, 421, 1200, 1836, 1500, 2157];
export const popularCitiesData = ['Warsaw', 'London', 'New York', 'Paris', 'Madrid', 'Lisbon', 'Munchen', 'Praga'];

export const scatterData = Array.from({ length: 100 }, () => ({  
  x: Math.floor(Math.random() * 101),
  y: Math.floor(Math.random() * 101),
}));
