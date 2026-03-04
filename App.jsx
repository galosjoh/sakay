import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { 
  FaHome, FaMapMarkerAlt, FaCalculator, FaRoute, FaShieldAlt, FaUsers, 
  FaBell, FaUser, FaGoogle, FaEnvelope, FaLock, FaEye, FaArrowLeft, 
  FaTicketAlt, FaBolt, FaSignOutAlt, FaThumbsUp, FaComment, FaPaperPlane,
  FaCreditCard, FaBus, FaMotorcycle, FaCar, FaExclamationTriangle, FaShareAlt, FaStar, FaFileAlt
} from 'react-icons/fa';
import './App.css';

// ==========================================
// 1. LOGIN PAGE
// ==========================================
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email: email,
        password: password
      });
      console.log("Login Success:", res.data);
      localStorage.setItem('esakay_current', JSON.stringify(res.data.user));
      alert("Login Successful!");
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Hindi maka-connect sa Server. Check backend.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-logo-box"><FaBolt/></div>
      <div style={{textAlign:'center', marginBottom:'30px'}}>
        <h2 style={{fontSize:'18px'}}>Welcome to eSakay Gensan</h2>
        <p style={{color:'#888', fontSize:'12px'}}>Login to continue your journey</p>
      </div>
      {error && <p style={{color:'red', fontSize:'12px', textAlign:'center', marginBottom:'10px'}}>{error}</p>}
      <div className="input-wrap">
        <FaEnvelope className="input-icon"/>
        <input className="auth-input" type="email" placeholder="youremail@example.com" onChange={(e)=>setEmail(e.target.value)} />
      </div>
      <div className="input-wrap">
        <FaLock className="input-icon"/>
        <input className="auth-input" type="password" placeholder="••••••••" onChange={(e)=>setPassword(e.target.value)} />
        <FaEye className="input-eye"/>
      </div>
      <div style={{textAlign:'right', fontSize:'12px', color:'#0056b3', fontWeight:'600', marginBottom:'20px'}}>Forgot Password?</div>
      <button className="btn-auth" onClick={handleLogin}>Login</button>
      <div style={{textAlign:'center', margin:'20px 0', fontSize:'12px', color:'#aaa'}}>or</div>
      <button className="social-btn"><FaGoogle color="#EA4335"/> Continue with Google</button>
      <div style={{textAlign:'center', marginTop:'20px', fontSize:'12px'}}>
         Don't have an account? <span style={{color:'#0056b3', fontWeight:'bold', cursor:'pointer'}} onClick={()=>navigate('/register')}>Create Account</span>
      </div>
    </div>
  );
};

// ==========================================
// 2. REGISTER PAGE
// ==========================================
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if(!name || !email || !password) return alert("Please fill all fields");
    setError('');
    try {
      await axios.post('http://localhost:5000/api/register', {
        name: name, email: email, password: password
      });
      alert("Account Created Successfully! Please Login.");
      navigate('/'); 
    } catch (err) {
      console.error(err);
      setError('Error: Baka gamit na ang email o patay ang backend server.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-logo-box" style={{background:'#00c853'}}>📝</div>
      <div style={{textAlign:'center', marginBottom:'30px'}}>
        <h2 style={{fontSize:'18px'}}>Create Account</h2>
        <p style={{color:'#888', fontSize:'12px'}}>Join eSakay Gensan today</p>
      </div>
      {error && <p style={{color:'red', fontSize:'12px', textAlign:'center', marginBottom:'10px'}}>{error}</p>}
      <div className="input-wrap"><FaUser className="input-icon"/><input className="auth-input" type="text" placeholder="Full Name" onChange={(e)=>setName(e.target.value)} /></div>
      <div className="input-wrap"><FaEnvelope className="input-icon"/><input className="auth-input" type="email" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)} /></div>
      <div className="input-wrap"><FaLock className="input-icon"/><input className="auth-input" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} /></div>
      <button className="btn-auth" onClick={handleRegister}>Sign Up</button>
      <div style={{textAlign:'center', marginTop:'20px', fontSize:'12px'}}>
         Already have an account? <span style={{color:'#0056b3', fontWeight:'bold', cursor:'pointer'}} onClick={()=>navigate('/')}>Login</span>
      </div>
    </div>
  );
};

// ==========================================
// 3. HOME PAGE
// ==========================================
const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('esakay_current'));
    if(user && user.name) setUserName(user.name);
  }, []);

  return (
    <div>
      <div className="page-header header-blue">
        <div className="header-nav">
          <div><div style={{fontWeight:'700'}}>eSakay Gensan</div><div style={{fontSize:'11px', opacity:0.8}}>Smart, Safe, Connected</div></div>
          <div style={{display:'flex', gap:'10px'}}><FaBell size={18}/><FaUser size={18} onClick={()=>navigate('/profile')}/></div>
        </div>
        <div className="welcome-card">
           <div style={{fontSize:'12px', opacity:0.9}}>Welcome back,</div>
           <div style={{fontSize:'20px', fontWeight:'700', marginBottom:'5px'}}>{userName}</div>
           <div style={{fontSize:'12px', opacity:0.9, display:'flex', alignItems:'center', gap:'5px'}}><FaMapMarkerAlt/> Brgy. Fatima Uhaw</div>
        </div>
      </div>
      <div style={{padding:'20px', fontSize:'14px', fontWeight:'600', color:'#444'}}>Quick Actions</div>
      <div className="quick-grid">
         <QuickBtn icon={<FaMapMarkerAlt/>} color="c-blue" label="Track Vehicle" onClick={()=>navigate('/track')}/>
         <QuickBtn icon={<FaCalculator/>} color="c-green" label="Calculate Fare" onClick={()=>navigate('/fare')}/>
         <QuickBtn icon={<FaRoute/>} color="c-purple" label="Find Route" onClick={()=>navigate('/routes')}/>
         <QuickBtn icon={<FaCreditCard/>} color="c-orange" label="Payment" />
         <QuickBtn icon={<FaShieldAlt/>} color="c-red" label="Safety" onClick={()=>navigate('/safety')}/>
         <QuickBtn icon={<FaUsers/>} color="c-teal" label="Community" onClick={()=>navigate('/community')}/>
      </div>
      <div style={{padding:'0 20px 20px'}}>
         <button className="btn-sos-wide" onClick={()=>navigate('/safety')}><FaShieldAlt size={18}/> Emergency SOS</button>
      </div>
      <div style={{padding:'0 20px 10px', fontSize:'14px', fontWeight:'600', color:'#444'}}>Recent Trips</div>
      <div style={{padding:'0 20px'}}>
         <TripItem from="Brgy. Fatima Uhaw" to="City Hall" time="2 hours ago" price="25.00" type="Tricycle"/>
         <TripItem from="City Hall" to="Gaisano Mall" time="1 day ago" price="12.00" type="Jeepney"/>
      </div>
    </div>
  );
};
const QuickBtn = ({icon, color, label, onClick}) => (
   <div className="q-card" onClick={onClick}>
      <div className={`q-icon ${color}`}>{icon}</div>
      <span style={{fontSize:'10px', fontWeight:'500'}}>{label}</span>
   </div>
);
const TripItem = ({from, to, time, price, type}) => (
   <div style={{background:'white', padding:'15px', borderRadius:'12px', marginBottom:'10px', display:'flex', justifyContent:'space-between', boxShadow:'0 2px 5px rgba(0,0,0,0.03)'}}>
      <div style={{display:'flex', gap:'10px'}}>
         <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'5px', gap:'2px'}}><div className="dot-green"></div><div style={{width:'1px', height:'15px', background:'#ddd'}}></div><div className="dot-red"></div></div>
         <div><div style={{fontSize:'12px', fontWeight:'600'}}>{from}</div><div style={{fontSize:'12px', fontWeight:'600'}}>{to}</div><div style={{fontSize:'10px', color:'#999'}}>{time}</div></div>
      </div>
      <div style={{textAlign:'right'}}><div style={{color:'#0056b3', fontWeight:'700'}}>₱{price}</div><div style={{fontSize:'10px', color:'#777'}}>{type}</div></div>
   </div>
);

// --- 4. TRACK PAGE ---
const Track = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header header-blue">
         <div className="header-nav"><FaArrowLeft onClick={()=>navigate('/home')}/> <div>Live Tracking</div><div></div></div>
      </div>
      <div className="map-box">
        <iframe className="map-iframe" src="https://www.openstreetmap.org/export/embed.html?bbox=125.1300,6.0900,125.1600,6.1200&layer=mapnik" title="GenSan Map"></iframe>
      </div>
      <div style={{padding:'20px'}}>
         <div style={{fontSize:'14px', fontWeight:'bold', marginBottom:'10px'}}>Nearby Vehicles</div>
         <VehicleCard plate="ABC-1234" route="City Hall - Bulaong" time="5 min" color="#00c853" type="Jeepney"/>
         <VehicleCard plate="XYZ-5678" route="Fatima Uhaw - Terminal" time="2 min" color="#aa00ff" type="Tricycle"/>
      </div>
    </div>
  );
};
const VehicleCard = ({plate, route, time, color, type}) => (
   <div className="vehicle-card">
      <div><div style={{fontWeight:'bold', fontSize:'14px'}}><span style={{background:color, color:'white', fontSize:'10px', padding:'2px 6px', borderRadius:'4px', marginRight:'5px'}}>{type}</span> {plate}</div><div style={{fontSize:'12px', color:'#666'}}>{route}</div></div>
      <div style={{color:'#0056b3', fontWeight:'bold', fontSize:'12px'}}>{time}</div>
   </div>
);

// --- 5. FARE PAGE ---
const Fare = () => {
  const navigate = useNavigate();
  const [vType, setVType] = useState('Jeepney');
  const [pType, setPType] = useState('Regular');
  const [result, setResult] = useState(null);

  const handleCalc = () => setResult(vType === 'Tricycle' ? 25 : 12);

  return (
    <div>
      <div className="page-header header-green">
         <div className="header-nav"><FaArrowLeft onClick={()=>navigate('/home')}/> <div>Fare Calculator</div><div></div></div>
      </div>
      <div className="fare-container">
         <label className="f-label">From</label><input className="f-input" placeholder="Start Point"/>
         <label className="f-label">To</label><input className="f-input" placeholder="Destination"/>
         <label className="f-label">Vehicle</label>
         <div className="toggle-group">{['Jeepney', 'Tricycle', 'Bus'].map(v=><button key={v} className={`toggle-btn ${vType===v?'active':''}`} onClick={()=>setVType(v)}>{v}</button>)}</div>
         <label className="f-label">Passenger</label>
         <div className="toggle-group">{['Regular', 'Student', 'Senior'].map(p=><button key={p} className={`toggle-btn ${pType===p?'active':''}`} onClick={()=>setPType(p)}>{p}</button>)}</div>
         <button className={`calc-btn ${result?'ready':''}`} onClick={handleCalc}>{result ? `Estimated Fare: ₱${result}.00` : 'Calculate Fare'}</button>
      </div>
    </div>
  );
};

// --- 6. ROUTES PAGE ---
const RoutesPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header header-purple">
         <div className="header-nav"><FaArrowLeft onClick={()=>navigate('/home')}/> <div>Route Finder</div><div></div></div>
      </div>
      <div className="fare-container">
         <div className="route-input-group"><FaMapMarkerAlt color="#00c853" className="route-icon"/><input className="route-input" placeholder="Start Point"/></div>
         <div className="route-input-group"><FaMapMarkerAlt color="#d32f2f" className="route-icon"/><input className="route-input" placeholder="Destination"/></div>
         <button className="calc-btn">Find Routes</button>
      </div>
      <div className="traffic-alert">
         <FaExclamationTriangle color="#e65100"/><div style={{fontSize:'12px', color:'#e65100'}}><strong>Heavy Traffic</strong> on Polomolok Highway.</div>
      </div>
    </div>
  );
};

// --- 7. SAFETY PAGE ---
const Safety = () => {
  const navigate = useNavigate();
  const doReport = (action) => alert(`${action} successful! Help is on the way.`);
  return (
    <div>
      <div className="page-header header-red">
         <div className="header-nav"><FaArrowLeft onClick={()=>navigate('/home')}/> <div>Safety Center</div><div></div></div>
      </div>
      <div className="sos-big-card">
         <div className="sos-btn-circle" onClick={()=>doReport('SOS Alert Sent')}><FaExclamationTriangle size={30}/><span style={{fontWeight:'bold'}}>SOS</span></div>
         <p>Press for Emergency</p>
      </div>
      <div className="hotline-grid">
         <HotlineBox icon={<FaCar/>} title="PNP" num="911" />
         <HotlineBox icon={<FaBus/>} title="Fire" num="552-3143" />
      </div>
      <div style={{padding:'20px'}}>
         <SafetyRow icon={<FaShareAlt/>} text="Share Location" onClick={()=>doReport('Location Shared')}/>
         <SafetyRow icon={<FaStar/>} text="Rate Driver" onClick={()=>doReport('Rating Page Opened')}/>
         <SafetyRow icon={<FaFileAlt/>} text="Report Incident" onClick={()=>doReport('Report Submitted')}/>
      </div>
    </div>
  );
};
const HotlineBox = ({icon, title, num}) => (
   <div className="hotline-box"><div style={{fontSize:'20px'}}>{icon}</div><div style={{fontWeight:'bold', fontSize:'12px'}}>{title}</div><div style={{color:'#0056b3', fontSize:'11px'}}>{num}</div></div>
);
const SafetyRow = ({icon, text, onClick}) => (
   <div onClick={onClick} style={{background:'white', padding:'15px', borderRadius:'12px', display:'flex', alignItems:'center', gap:'15px', marginBottom:'10px', boxShadow:'0 2px 5px rgba(0,0,0,0.05)', cursor:'pointer'}}>
      {icon} <span style={{fontSize:'13px', fontWeight:'600'}}>{text}</span>
   </div>
);

// --- 8. COMMUNITY PAGE ---
const Community = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([
     {id:1, user:'Maria Santos', type:'Tip', content:'New jeepney route from Fatima to City Mall is faster!', likes:24, liked:false},
     {id:2, user:'Juan Dela Cruz', type:'Praise', content:'Driver of ABC-1234 was very helpful. 5 stars!', likes:45, liked:false}
  ]);

  const handlePost = () => {
     if(!text) return;
     const currentUser = JSON.parse(localStorage.getItem('esakay_current')) || { name: 'Me' };
     const newPost = { id: Date.now(), user: currentUser.name, type:'Alert', content:text, likes:0, liked:false };
     setPosts([newPost, ...posts]);
     setText('');
  };

  const toggleLike = (id) => {
     setPosts(posts.map(p => p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p));
  };

  return (
    <div>
      <div className="page-header header-teal">
         <div className="header-nav"><FaArrowLeft onClick={()=>navigate('/home')}/> <div>Community</div><div></div></div>
      </div>
      <div className="comm-input-box">
         <textarea className="comm-textarea" rows="3" placeholder="Share an update..." value={text} onChange={(e)=>setText(e.target.value)}></textarea>
         <div className="post-actions">
            <div></div>
            <button className="post-btn" onClick={handlePost}>Post</button>
         </div>
      </div>
      <div className="feed-container">
         {posts.map(post => (
            <div key={post.id} className="feed-post">
               <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                  <div style={{fontWeight:'bold', fontSize:'13px'}}>{post.user}</div>
                  <span style={{fontSize:'10px', background:'#eee', padding:'2px 8px', borderRadius:'4px'}}>{post.type}</span>
               </div>
               <div style={{fontSize:'13px', color:'#444', marginBottom:'15px'}}>{post.content}</div>
               <div style={{display:'flex', alignItems:'center'}}>
                  <span className={`like-btn ${post.liked?'liked':''}`} onClick={()=>toggleLike(post.id)}>
                     <FaThumbsUp/> {post.likes}
                  </span>
                  <span className="like-btn"><FaComment/> Comment</span>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

// --- 9. PROFILE PAGE ---
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({name:'User', email:'email'});

  useEffect(() => {
     const u = JSON.parse(localStorage.getItem('esakay_current'));
     if(u) setUser(u);
  }, []);

  const handleLogout = () => {
     localStorage.removeItem('esakay_current');
     navigate('/');
  };

  return (
     <div style={{textAlign:'center', padding:'50px'}}>
        <div style={{width:'80px', height:'80px', background:'#ddd', borderRadius:'50%', margin:'0 auto 20px', display:'flex', alignItems:'center', justifyContent:'center'}}><FaUser size={30}/></div>
        <h3>{user.name}</h3>
        <p style={{color:'#777', fontSize:'12px', marginBottom:'20px'}}>{user.email}</p>
        <button onClick={handleLogout} style={{marginTop:'20px', padding:'10px 30px', background:'white', border:'1px solid #d32f2f', color:'#d32f2f', borderRadius:'8px', fontWeight:'bold', cursor:'pointer'}}>LOGOUT</button>
     </div>
  )
}

// --- BOTTOM NAV ---
const BottomNav = () => (
  <div className="bottom-nav">
    <NavLink to="/home" className={({isActive})=>isActive?"nav-link active":"nav-link"}><FaHome size={20}/>Home</NavLink>
    <NavLink to="/track" className={({isActive})=>isActive?"nav-link active":"nav-link"}><FaMapMarkerAlt size={20}/>Track</NavLink>
    <NavLink to="/fare" className={({isActive})=>isActive?"nav-link active":"nav-link"}><FaTicketAlt size={20}/>Fare</NavLink>
    <NavLink to="/routes" className={({isActive})=>isActive?"nav-link active":"nav-link"}><FaRoute size={20}/>Routes</NavLink>
    <NavLink to="/profile" className={({isActive})=>isActive?"nav-link active":"nav-link"}><FaUser size={20}/>Me</NavLink>
  </div>
);

// --- MAIN APP COMPONENT ---
function App() {
  const location = useLocation();
  const showNav = location.pathname !== '/' && location.pathname !== '/register';

  return (
    // Dito ang magic: Binalot ko lahat sa "mobile-wrapper"
    <div className="mobile-wrapper">
      <div className="mobile-notch"></div> {/* Optional: Notch sa taas */}
      
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/fare" element={<Fare />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}

const AppWrapper = () => (<Router><App /></Router>);
export default AppWrapper;