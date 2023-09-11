

            Client                              Server
POST 
- username  /auth/login    --------->        - username & password có được gửi lene server không       
- password                                   - username & password kiểm tra hợp lệ
                                             - Phát hành 1 token (...)
                                             - Response client: token

Mỗi lần Client HTTP Request
Đính kèm cái token này headers  -------->    - Verify xem token
                                             1. Hop le
                                             2. Het han                                         
                                             3. Khong hop le