import axios from 'axios';

export const request = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    key: 'AIzaSyCVOT5LxGsE2u6sEIw52obgcr4f5JlSEAc',
    // 'AIzaSyBbHuHN_rBwL_a0JkFewpnCS1skM217Tkg',
    // AIzaSyCrCIpw7FIYlipGc3LDQohq5D26I0pB-Yw
    // AIzaSyAdqYxywjcy8J0OVOLTAhJiKlfffNzbCkA
    // AIzaSyAeKo5HJ8zNhBf5lMYQ9VnIyyNDzB6XRlg
    // AIzaSyAX4apqlPLCSIdqOOIe2os2F_tCvzA5NEQ
    // AIzaSyCxWWeYN4Uu-4-kM3-KajCo-AgJdEpAKvI
    // AIzaSyCVOT5LxGsE2u6sEIw52obgcr4f5JlSEAc
  },
});
