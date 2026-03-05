import { useState, useEffect, useRef, useCallback } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

const SEAL_B64 = "data:image/webp;base64,UklGRi4xAABXRUJQVlA4WAoAAAAQAAAAxwAAxwAAQUxQSI0IAAAB8G79nyyl/f89X/WqwqUgulowJ+PwnsBlEE/lnTlx3G0GyJxjCe4Y4JbDyUy0U78dqKr9et4Aoeneu/ree0XEBKBFRULAvqfmF/vrP60/YsMDN3y0/tN6f3H+FPYNQVCeIuqx9+RS/8Zfz3de8ghf7jz/60Z/6ST2BpWikAAAcws3+1uvuX9OKTWHa1JKmfu/3urfWAAAH6QQJADA/PLakyH3xpjNjEdoZjlG7h3eqy7PAYBK96kHcPba1iuSTDGbcUzNckwk+Wzt2iIAr50mXoDFa5uvSTKacewtR5J8tbk8D4iXrhIP4NIPT0mmbMZJtZhIPllbBuCli1SAheubJFM2Trhlkty8vgB47RoVYKEakJaMrWjJyEHVA0S7xAlw6e9XZMps0ZzIZz9cAkS6QgJw6W+SydiylkhuXgKCdIF4YGmTtGxsYUtGbpwBtP0UOFNlNpmtnY2DqgfRdhOB9nfIzFbP5M4qENpMgeUtMhlb3iK5uQSnbSWCMxtkNHagGVNfEdpJgSs7tMyOzA23l+C0hQLObJCZHRqZK4VvG3FYGdCMnZobbi/BtYvCV4mJnRuZr8Bpiyh6NRtjB+eGGwptDcXKgJEd3XD7PwjtIA6riZmdndisQNvAOb/BpmGHpyatwsnEOac1M7vdGm545yZMoTUjOz+zVucmStGrGVmAkbU6N0EBHw+YWYSRtTo3MQErmZmFGFmrcxOiWMlNw2KMrNW5iVC3kpuGBRlZq3MT4HDiDRsWZWStzo2dc3q3ySzMyFqdjJk4rZlZnJG19zJW4n3NyAKN3EAYq4ANRhZp5CrCGClWGVmmltIKdGzUXUnJCoXW5HPwY+Jw4g0bFmviQ+9lLCTM3rXMgs3cgB+LgIqRRZu4Ch0DlSv/i1Y2ltI56JE5d+INGxZu4sPZIEel+NMyizeyQjgilavMLF+Lw3PQI3HuxJumKSBmPpwNchSKPy2ziCMrhCPwuMDMMrY4PO90ZKKzD5tSYuJ9jC6gz8hizrwKHZG43qCxcmrsTU9kNAG3GVnQ0SqEkaicH2YrKbNBT2QkuM/Eoo6sEEaguMjMsjYb9ERGcd9Ki5EVwqEUF5hZ2maDnsihZh5YeTGyQjiEYGHXrLzMBj3IwTyqHFngkX0NBxJZHNBKzPhsRuQgQT5hZJHn3fPQgyi2mAuND2YOolhmZpmb7Z6BfCjgd4uFxpQr9R8QLD6llZrxmYfsF/AJI4s97y5B99OwxVxukX9o2EfwUaKVm/Gxh+wJ+G+OLPgcl6AARI9vM5dc5O8S9mBml1ZyxidzEEDxn7e58IZn9wT5nZFFH+0TBAjmntDKLnP7uIpgYVh6xt0ZSMBNiyy85u0laMA3LD1G/ojgjm8xl9/3EhAirfSMO/PA0ts8BQw98BMjiy+/XwI+nwIY+ROO3WOeBj7H6Xe08su8d2xuZxowvju98GI62Jm7Y4nTwIuFnzgNMNmdaYE/3ZoW1h+xmQ5+4HSY+FszHZC7/L9Xm2lhl9Nh4m+P2EwHP9ximg7Wf5oWfpoW7M4dmwaMLxYWXtCmgZ25uZ3p4N3p0++mgcx7x47dYy6/yM+BrxmngZ+A61Z+lt8vAWde0YqPQw/MpWlgZx7u2N/MpRf5o4QZ9LlbfPYNguLy28bKzjhchAhmdll8T+cg4o7fYy67yHUJwAwq7hZe/hoBUFyOTdEZ01kIIPBPaCWXeS84AAi6zlhyu6wwsw++zkXXxMvQPYKzu2blZnzsIXug4QFzuUX7XQP2w/lYcJnL0P0EM49ppZa5BcUHg/5usdRi/kTChxTLzIVm3P0I8iEotpjLLNuDoDhgkE8YC40XcCCRxQGtxDK3oDhwQMVYYpGfSDiYoPfUrLyMg0WRgyHgd4vlFVkh4JCKZebiMhv0RA4DxX2m0oqsEHA4OT/MVlZmg57I4RBwm7GsolUIGKG43sCspBp70xMZBQIqiyWVeRWKkYr03lhTTsnuQzFixVXmcsq8KH5UUNxnKqXMP6EYnTs/jFZGlgcnxI0OARVjGUX2JeAIJcw+ZC6hzIezKkcBxblhtPKxODwHxdEGVIzlE1kh4IglzD5kKp1sd2e9HBUU51Kysmn45gQcjl6xylQ0Fv93xSnG0WODuWQiKwSMpXj/kKlcst2dDTIe8DiXGyuVhm9OwGFcFSspWZlYk1ecYnwDVhmLxFJagWKcAzYYSyRyFQFjLd7XjOURuYGAMRenNWNpRNbey7jBOa0ZyyKyVicYf+e0ZiyJyFqdwyQ6pzVjOUTW6hwm0zmtGUshslbnMKnOac1YBpG1OofJdU5rxhJ4z1qdwyQ7pzVz51nDWp3DZDvnN9hYtzVMlYfDpIvDampSl2XmFThBCypWGqbuihx8jGNox4D/bLPpKGtY96BoS4VusMldlJkqD0V7qsOVzNg9kYMVOEGrOixts8ndkhvWPQS0rYdWmbFDLDJXHor2VYelbTa5KzK5vQQnaOUA7SeadUE27vQVAW2tDkubZLS2s0hunAEULR6A1R0yWZtZIreWgSBodRX0+gMyWVtZInf6ChG0vgK9akAmayNL5KDqAYouFA/0qgGZrG1yIgdVD/CCjhQP9KoBadnaw7KRg34P8IIOFQ/0+s9IJmuHnEhuXl8AvKBjxQPzlzZfkZZs0iwZ+WrzEgAv6GDxABaqZySZzCbFLJHk5rWzgHhBR4sKMLe89oQkUzYbN7OYSPLJ2jIAKDpdPICTy2tPhiQZk9m4mMVEksMna8snAfGCzhf1AObOXtt6xX1jMjMbnZnlGLl3+Gzt2sIcAK8oRFEPAPPL/e8Hr7l/Timlw6SUUub+r3fWri/MAYBXQUmKeOydP7l8+9vHzwcvOfKXO8//utFfOjkPAN6LoDxFNHjsnTs1v9hfX1//7f3B3v+2vr7eX5w/hX1DEEGbAgBWUDggeigAANB7AJ0BKsgAyAA+jTqWSCUjoiEx2l1QoBGJbAhwAY2B2LV8k/1n91/EL3VK0/gv7Z+0/757tenzp7zWOiPPx6Ff09+q/wC/rr0oPMH+5XrH+jD/AeoB/Y+pH/c/2KfOY/+ns1/4v/z+mX6gH/r9tngUP9B6PfC79R4g+Rr257YchLrfzV/mP4K/ff3n26f0veL8oNQX8l/qv+t8VPYr7v/pfQC9m/r//P/yPrE/Bf+D8sfcz7E+wB/Qf7N/y/X//keAp94/4X7XfAF/O/8J/3P8V7H//t/sPPX9Uf+//T/AN/OP7b/4/8b7cn//9xv7of/j3af2x//7rQmPuoj6XhJk16xXtwf5abYP6U+znS5q89eYzQcZ2wSJOv1nq/oOs8Fi9WayAocWBffqaJT24K/ZNV8//eeBIHSimwCkf95u+qg0y/EqfTI3Dez4Oj6bfb1VSHvDXdA8IFpO1ykMjEek9kS6/9YF//2DnKst9F9sXKMsG6Af5eTTWhPHEETwquBeHH5miO0R5bD4/6e9209Cl6yv+DrSrByozI8PP8Xy3EGtG4HjdAz1TpVijnHO+dO8YsveuWl4ZJZMnIN7o3rbsgl60XzTzSy7IVEcUWd0ouEKxOwg7Y/EEidX/vT1gba6NKO8484JIIISOOTCnkuZnIru9hk/b6/HNH8dZrgDZAmyBbg3Vq9ogCmOZ3Hw5R5xKGAwbEcZDlIkUYp55UBtkH5i58XljwU9nJT4sUc1DjGp1NZjIy0HjMO8eXTcVj8eXa7V/Nv6tKD9yTcgN/5dKUfcSWZSRRqqwXKuaBScNIfgzoc18cqbrUKqPCF8sURYTvnGfeUbVmnmpWnmlaBew9ctE0b+oND6IiPXcJkM0CyjS72d/R2XDDbB1EtcbxndiE73OcrlD19Z9EVcVSj5tuqFVW29++5eLQ8c2kQElR3os2BNIeQuF0/norEf/4u4WRbOM9vCyCv0y+8psyd0FgIWnGO7hRG/vBh8awJyHs58NmlDfXGHdPm8AqWxdjUr+FY244sTXV/Yh2kIUHhgAaMGE71WTMXl8xr5EM0adJi85jfUHe8v836i8wiSKCSzT+Tsfu53V+0BQzAW0esLgTGIdj9Tn1zexh918rFG9N4elv3Ak/GUMspTWIPFHD8dsFkwsWKxuaOTcns5tqRQrJZzImjpTYSEcv6XOyLEujzvm9C2q+UCjdAn5EfWIyOPsqsFYvPEhFcl2Pyi5xQYY8tX1xJ41TC01BfRnYLWCk7gY2fruHvFcRf2VxTc2bmUsCf5Mrv9pmkpf8+cjDwcc0dubXYXQadXEvFaSFz3mhTb0PzpAAD+3+gJZOt27X8Y3b+Xcz6Y+XBE0cYox1tbn9sikFEtVmKOKAlyjuQceGDiXc6RSLgIbYEqZOYBd1/Rq+rl+sa+SnbQOS/JIcFYtkiUs8dfosqw4Q2kBJR7iy6XAd1YMtNtkeBBNXH0RuBd0TU23A6iPXKTLbzAwbBqrd2ukaaIxo+JvZ4BFiR0saVv1jw0M2dox+zzDQtxJ4v1NmNgR9i2zfFhtSDZ9rtcNrC7Z2Rh/tXTlUcPi3b2/vQHfD0O4k8K7ayVToDhGUjQzcd6q5mC86CzzqGeKTo497M0ECnNvu9LzKuem0r/GNIBpbtAcldj256jHfduHHmAe8jr1Qu1ihwjUUISRYYvhA8r6U6a4G2tfPG+caDiJppz6HjD5aBjcgETiifkYd/5++6bWnu+jAAWaU8WYpxODYUYvoYOqzZecNmWTWFUdopISVdk+8BrxNEMUcKg4iCEdCanQnmcD8O5J92Rtxx7ri/DasRlDMY6EvStODB5HiFq7qoBb7iqMM/y+l2fOsN4kzeqmXaADrJvHF4dpVloDGE3P3u80jQ721fyUpWq1syN7mllNwzvTAhloNinVWVhrK0vYihiz9Lwt+my/U35p21+oZMTceWKyve7lvVBSN38Zp8mAMHh84S32GW0nRMvAoSbPULIBN+DhAuRHBnMBKjrI8ewaMBJIeT1+BtLNXhFuInnChOp/QDVHquow8Pj8qxHmRv43JBlh5qeiUIl4bNv7hbTwOJsa8HzZkL6so5yPTboY6jKsA1Yzw7bqzZ11lwxX+5kCct2nLziKvhl2ei0WenhM7st0V543Hk7srVd7yWcOOeVviEmTvm8wIONFLLXT6dsc4ZpbMnFrWIav/gxpn4ooX4mGXNR3RUgMgoXBF4YzxS0pKSxNnUd6er0c/d4Z+StdyYKaAeWzRd/6RcGSPY0QKhdgPxYMDBb8UWEPFbrOklRSrL4DcqitdHN5Ljz0Ah0jzOxFpwBguaqy9rb81hnwjT8P1MFdNif2Csx4BeFGuy9daaQCbclbvtWnrwJS6p48z7i69n/nxqLHJMq3QTzefNlw1GWqfApGW5zBdIEx416jIe4sSc3cavJJDk3QMEZQ3hqy2yxMGe4GFye+H8mKrdQZOma3iIlKeo+2kmjZHWT8CRcMrs8BKDFlQ6GplWXzaTYbWhoBFfzukLWUmY8VGiRUlFbhzJdbudQk1zaprslnvWpxikMykgAsGT946FCLGG4Y4/v6SdbvzvKsUrJIBvofNje4AgJlEgeoShwRrtZoXXI7uJlM6DFcOtJ0M2Yvisf3SDt1ea9RGZTguNMB0AThHxFm4b5w/9mYbOpNY1ReKGgMBEMc8O0AItvbkgXiACkzmcVghk1RIQfggW9pDMQsd+q6JJAx4OucAvKd0N8nSncmOtkG9jdVZeMF+Nk32vMTcjLHZ+Ck4kSXIGo8Otf3+/VLyFnTVgWXIq1N7V1LG+/Y/jGhxjcGWL8rNFgkx0tKOFqFSYMeY0NQGfU2F0UhXiNA4zX7nhrznP6YvU56uZ22gBpF47m5rM541fH7pAhSYId1puPI5hcRBaBG9OTezMPzVMQcA3tEzYl3WcUZQfup09tWtYjCIahAu+sNq23uDzFi46kLduQrM1aIU1y56jmEpLRjXK5heC6+Z9mTvBbxlnn7x8UajlIuFHX0839Vk1wRBt8cfCt8+exjpulePo1kt/Wjb6Wd4A41JAEDhYh4BtgcmmkVdX7jT6UhYICDQ4zCyAhQr7nFl5eyl69KF6i1edhyTE5EtLumGNh0pKPKNXgf1usuQW8MrrouoiKhPsnAKEEN4NfnAYQQN4eQZMho2a8jnchbOyZKsJscYczERjdTqfAiMkS+1aqGYX0fyzIjlkbj2msbrti3s7G5g5pIVctPInl3X3P+eErhni6uEIf58/n8arej1qLhRllkZKo363o1iLrAIt3Fs2nYoTjffNGNQJEErYvRopgO+uEOhNidzCGNhh4EeVSk/OiwRaaQCxyDqpVKitM/x7e8OAan1nhfpc2pj5qzN7I/NoFrKGy3EwqrPmS91HtA0Wjls3Icj5eYo1LNE3k+Rda5HW+Imu0tocSNhW6U3kn832TM8e2Erso8wfMn5Db6XJHPfxMyEGUTEWUlraEpIWKYIg0sxp4U5dsxN4OlwD/tBxeilnYKEA+2Dv9Ku1LUVhcXM9ZDTNvlPMP8FeMFAmxJqsMulMD2gG21xpnPVKkUNvxNbUTO0TDITJPkFlcURGrK+yRJlBDDNPK2Ob2Q5AfCpa5Tw/UWnZoROVszehfzUSJ5QFXHINFx0c7LC9rfNRGSu8QdgPycrd6lYhRSBZVJvb/uUH00n1eRumDd8cxSNayTw2R93SweeTV3zfLD5BPx5HjsB8V00VlaPrNkVTidgeKhTY+Kmxfoo1G2LvyxDNKGsnUyomUeqT3prD5FLcKjv6yseWrTTzfy9TCRAXIKo1kwvUsqGasMr/ojWtj2EkJkJlTF5H3DlJATOCoNp5khdZQ1I1Pot9Y35JVXhFi40+4oh5r6yrVX3pyFm3cfI8Bnxx9Z0RE/W+D71B0t0Si4nI5fsGhOHyl0+bo1bSvVOwDmQFxb/kowuu10HOLf8t+jrgvm8Y3ngteOFxXtFHRVTslCfKVEAhtmQER1xPdvn9vl58XxzhmDicUUHGeVfb+qA7q8JjQhGlQ4oDPSq5nn6pySUtVzu9W3nXA3QClF3jK8+hCOC4aWjWtA4BxMYtP+uGX1p72uQx+ujfI/8Gbi6ziTaDjeVQp7Vu+Kz58cZuCFxo5GgeSfwWzXYFd4gsbgMwcVmRr/4HPYja6/kzowpLvuE4i4uetFmnKqVfw30a+kwYdet0fZ8loM58FzSX8aPMkf0QI74QKGaC5d8ohFMAER8FIBW97gz7A8fLtpFxq646O7Q8Oeed4W7aJnFoY1gcBMWPv6w/Gylf1ygXxG5Bu3oLJXTKaJZ9eHWs7ZDCX7kQ9akJnaIV8erOmeK2Nj2BpCGL5SJKbMsCU3+ayJjmR3hCCg/AUNVXioaC0O1VgvglP7IMZGEHS+z54TAgmQxdLN3+Dq9gzZf3BMk/MNK1nvNbUrIwWD25HW5m87bv36am7mCHAzVYMka3gJYvIBwJNDV/E1GNyG16Hpkxa0nKn0zyu2YzSBT2RMDe92IPTg13RMj+sHJ8786voXdR1QcfFoEY7WFlAVt9PumnRvhIC5uqGFnnhwj2Yoo+A057wgH4UOkGfQ6ZTNiZI7/1lnx2gUHm4Ua+1370qESCRgtQuECAmz3tpaKxetCkaKdbL2fVTfUMMymc5gzMoqxK15BxyNf/7G1V6vxB2USaMyezQxrabqSVaCV5Pmni9lYIsBicoxXtyx2vEi8pk2M43K+UYDPhUmAs37eD5szG9++M/3/VtrO93m0XSQCZwNiRzrCYLMnC9VXQLC/aRoumHAsyem0PCplarZxwBgDRUCxgut40udLg0k0kC9QeryjwyX4NThGdNVYnJEacBJTRRb509BQ1Fgbyk3J7+w00SdrXWy7ryG0YGujHxjPAq5cFGABrO2TWjsnrwjRlS6xlSpJ/mb+CQAKue00JnIhmQERKWn54rZ3OAp2214Qffe5JGAYiO4RF8fw0Sd7fPs9p7cVykDPUfXfcMzdrJsza3ZJWsl8ljMy09y/o5dQ3QYSyfOR/6yT1O1Hvn4Ty6vKvMsHr1mLR5VU5i4FOFo+3iS2c5lZNmHzJD7rPI7I94veYmQ4Np21P7uvHXdDRcaS4CtoKGdhV79rUICBxutLNw7QSepi0XfjrLTnwE5tRBCQewgQXzGIHxFzZty/kJ8O+bVdtR1Z0DJCHgB7KcKOESuX0gj4lkkLns7jU5c9Z0/u2kDYZdqIG4weX8+mIQxVXKjNieuwKPXtO3683dc6rmBBbTRxRkX3jIIrJr4jFSZ0y56ukUGSid2KzRWyrLa8FPD1/Mwz2cZ4NZdGQmAtgwtklI8mp4NvEKmwOOTva+YE/wV2Iue/71O8feo/uppqy38RP0V/ClcEDxfFF8E6gt9WPl8RkKdCva7zN8sKRgsEfFKg/HTwXVfTV8DzpH41+ve8TTL+JIzT/DLxY0HS447WP2grxZ91LpdhycaGpBNLsmS25d+4ZwYJG4tQr2WRfD4lyVusenix+e47N9PYNA5ZPt+Xar6UDO6NVGyhyj6DGaTbNTH4VapeDdou5pgIE0rmhV2C6lORSU14Fg/b6N0gVAn1Qymqc7Hv6nG4Xu1fN2cV+nGqdrL2bh1IPwG0PeUgouD34eHs7VY69XlbVy6PquVAltmAa2k3vupVZsIL3fNMKPTGNrKwdI3MOkbdLQ3UeZpSVQ/uvrvudsOZ5q+cXWwLjnKzHLxERDNHDJDpgDVbiUAf0y2qE8s2+MYhF1oQ9k0KQUeUae2ztnmUVpSIEfnUMVsg+AMflCm7UEuLYOj92VxETQJlTzG+rZxTKy+zVa+FRRVo0I6f2cu3fl2nF4lb6TiRpzYxd47IXDBAAnNm6PaNFfLguXDWJoOJI1PVtlUPH0+D2WI28JRMDnTHHDVE9fCzR1BfWQwK2nP6QRbV6QCr1BRtIYeQrGc46XxLd11g7DYZ1IwFr5uMYhZ9gP3SJLyoG6MLWVM0LuqY0K7pVmBI6aShnubJ5Q4YtnpVsVlk0Wf7n/4k1QIHHYCnbqqo6AFE+80c8sWed4bDSbvqSvSUjRkktawnPCdZuBFAI5fXWqSCMnoaprJrYDAESlOEfpyBOca+LeqgPU4y/o2+uY9q1W6fXj5LppZC4eoya10X4x81aXBR7n7/kpn00hcJUwNMs7/Jd3mJoPNIqBQ+VNwrMCkfYt9GMs/6Zchh6svf0WKwzcarpgv4R9kiC8kntzmewHFqNQMprGp+2IaYISpOXqb+hJgkH/YjjgpibHdhCw488bDKfSC36QXpWHkwbx/H447Ye9D5TPJx+xXTy2QHTxrD4jl3kORSrIZtbESWEve40/BBpdgANqhin2Iq2nlyx/kt5cZkkBDOcsHVa75UeJf6psTaJKFzIOfGBzhwwrd29/u4VWyfzQRv0hoh3lqCty46WI7ygCEF4YGb0rrkpc0yOZnNSWM/VC25HOSzHqaY+MAAhNWC7BWrQY09urHQySW9chS13kDXmKKuxmc415VWSTIVYR7DXVRbW1hUqLgv0pYXI9Tio6GheeZ5tzcyioOMD15iA3uQUtckUVuX4by1CpIO27a6IiOww635FsNHpbepNgzC5D9xFzpqGAJlJe8S8yS3sVUb8XxVXCgVQ/icqPMAKXo37Pz9wDYC7DNxRj9HdtrVyPMqgij4RDrfpgukCqWPXlefdIbqc4OCYu1C+fPne1Jb5mfCWWfHsMvMoLlk/33hCwwLQ7r5BGSv6+FoIFw6029nB8szPb3gSQ0zokkD0KGbBj+boir075gEO4ynTVXhh58PJtMFb2s6wWaYaO/jjCphyremLFdyxcbgW/gp72XNq9tine/G344yprceiQAxLRd+UJJXT0/QVulyff+VdNySCLZf0Ifo/w+ytINxzzPSc0ubhYC7st0z8vH+k9s397PR32GnIlRgsEAn9Jr23wbRNaoQOHPNdiOqVacfQSTSrI32mkb2kgkOGeF2811u3IToh47dADFmPxAn/LgvFT0JPQSWHXdPubNTp9gvZFyBFQVNm70zLPeclnZPLXUSrSRjYuQZ+86hgUih6+yVIBIbKbih3VpescWgLA6LPEzsbfiQL9J5vzIfhlmzmdkB4WWmywGum2uZQ1aMjx0k88KKUYeCTRvfE0bdrdNEbYVrGY0biUt+GD0aTqsDmqvn1jugZSK+TYCXVeM8392EKQB59pPgu2WG+XGuW2U0UeV8yw5+E60PTorfuDtqx4rPq9r7ia5215U4kLpBbP7qPDmxnJQOrheaacZes9z2rQ6H7j4MZ0qPd23wPuVRwgdYZz2NKrnK5Jax8iOJn3uINYRC7jnt9ZUknMu9HeNADPm7uswTb/sKGyTRFv+DrYsCkt3GVELupykpsrevjp7AhBRcjUD2Y/RwmD4GUfvqEUrBTtJ+wwzlA5SVAWCK1SHDmy8fzV7d8OSeTCoAN3pyEb5mg1+szDSG8KpZqaweGIm5pUX4wGEgNL5YKoBsbcf088JQzj/QeaODeBmLa70qhM7nwk3BZcr/pGlx2KBL5KE24VIrDnEW7hKxTdFaju/3TjKZF05wpx1l4q6F6fIB8NRx5nHafOefQZXavO6W8EVJOX9QwRdt5RLbqwPnRqQZyAfQ5gBU8ueT9lExIhw6n16MCKPCIeCj1FnICzPjBqAsPE5XfmHy/sQh8WNq1xnA9iNvNBHrbT/sULwRYVBPQL5epmKbjaFApHst9hXjWpyYE78f5Xhij9VrDon/7Uv/jXHemql9m+S6IpzzAdTLj9cJAphAC8+h6Yq/nWvgwoUnQsVyXHH/8cnxPWygwygV/6578xU0+oH3GUMv3Nj0Kl7hJIcQGVM8XAKY5tXCg/6GN0Iw/IArXWA9AK9RtYTLvZMsAWfhbE984bnSd2Vkcj6+aq0gsX/wy4a2BcFZj0cVJWgX1iSo2rH0RxZizAfsoXpEiOdD+DZ3+N22afcMUxtRglNxfoimgifkmOsryOEHae/lMKRIrLqJ83zPDENlzNjdnTf7XQiariWTXS3QAtklSR5DtkE+0/YA3sHbAYz+YoM7rVao1wXN9N/vu9mscFLIGsHwF6a+5LBoX3Af4bULAQbwtpXaZwpXx7IFocn2lUrYuzfXiL6ZpN1cnLsHnzRiemlc5qMe/Xvoa16fZP4btkFJpe71UvJ+gb8rUX23PlPjxPlnvuuecJPMlElQd7TnEwSRBXi/HDwpd/aCuMtOlJUQDcCTk/plHU0q+XNPNjYDyXfffCty507cHUNFvr4W9EvLhQhkzSrpPc5S6ao5NXE7JwmD9kHnLj5mKSmbwdKYwgzcOtUCBY1kXSrcvoKytBk/bh7oPDPC1Yssk+CNtWSUkV0P1tmYysEbQrQU40wIIi2cKY34T+CKHSlgUOe5Bk+t8BqQOb8kFcUNvsdEaZd3D9JAwS5J/SsYo0Y5fBIcxyWX+Xk92nbAZRY6YSdIf6ohz3YTLxEEysN2dnsJdaNQyizKCe39XLMHtRnF3tryQ/g6oS3YLgclKLbzz13azg2dsHbHoBBZ6neQPDOsschhyIqAgYIXl2gCOdWVVLrpRd89xck+hiuPS/Ad6Y1sv9FiSWZ2b27NE3jm7N/RWCXnX6m9FcN45zqNdo04mu2F+Rm1h3dbepmdMHCgPfpgwGPStdgizP+2ox9IR/6VFY1kdtREbOPstdwdoHh7JeUbDhy57Y6HoRgFmZ7N6E8Sg52+PSUvma34z2e1u4XJ44uJth6/tjkPNXyOZTc/qSkek1RpFTCRkQRjVaMD+vQlWW8lqFirAnllu7WTE+6A6xh7tmRCXklTnnVpwzcmV01y3eBTgR8jY672ydLzujQuqlm6D8Dx2u2h3qK8pFycZOREasbfuvV14NDB99o/09A7Ht23PWI4EakrOq5kLM7nRbKU5PajFYNSNM/HWdLcWIt6HktAYSVSdIxfpovphgkwTuVuuhmwjuSieNpD060w3yo3ly1JBZDSVq3U6TlW1pph2n4QRX7oM65hoMlF62jJlnmYNPswitKQYV0cfWUjD2M4vLVjCCdCpt8Az3x9l9Xok//EKzKpYPNY5FK6ahYuJ1ZJpWtOM3ex4lB5Cbv11qbXlAWjF8O2Dq3RYMkWPZWhQFYAJ/MS7ghd176/TgTVg66smzk5Gmip0viIizKTI+9VFRJw2Cd3B30eU+Elorm9NrxVP7xC4UydxKoLWFXK53gG+DQ5o7quTG/fbcApJGcECiaGd1zaei7O6rr155uXvDoTeDAtcxduQgKiWrFpsc8fbzpuC1xM4aqFi5oWfExxNSS8HsuGae+0NkNMquCjpC1Ubtr5VVf4NNysaQhL0f5kqvwB1uxwc62TmaUeZFFj0abG2j6BOas1srpv4ps6Zx6zBCvs3Vge4/AMSi1qfGdMLwykZHSs+7kLUDt5sgZBACZgXUKKEKQCjH8EjfItW4ezQy5WSVU95EugQQC9ae3e0Pz0Lb2d1EDjGLihwp9+78k0NHp7u7A9i5lkDDNfKGcLQppcbLr/yIzCQgPkB5UVhS0wjFj4HmGaiQ3EhktnsvQVD4b8OQCbP0MuRsM4FNcqckC+18cEp14EuOY6W6zLoAOGlQQCkbIbE5a6SEiUPJo/OlWG8QN8UplyEdeLSuc2eFtm78z5dOW/gwV1zcnRN5tbchJ09PMrUNkDvJxpkGGRzyeb8AM6GRlfMNaRxmvWO/2+6Y1xT5JBwVX82h4TR7N36Fa0Tx3FCwzlkVI1KEzNAqZNwf5NMsfRfDsT37V9WPeLtEde56Gn1/c1wgejt3bP/Y4QN8g8AlndVJrC783ezEn74xaOuT+ZaOfujQt1VqD8waihEXzOW+KhNFfLhJZpUSqYrANAF2Ru4aSnhZ2UDxmN1wnrrMysKp9ZWxF2PlBmSGUSbU2+fbPlbw3BQDvx011IitiWnHRbhuvc01XGlrgHMpmtepsOeOIL0demjktjkEsXodsShVINU79kNSI2RjzOS9rI51oPyM/urYhdVpc5qrnOJ9vtAatsqVclVItrYGsLVfVrf7Hjxo+7juJS1B/eBn2/MFQxZwgUtgv59wkIjHOkI8ufg02qsMGdZJE1akfIwrGbVb81dTa5apHwFeZXSx0a5Ol+5Z5/3phEhn+48dnq6oQHSrdojyqaEZWUFzQH32WKMCVbN/afylmhDP3VPsdxQqt430PBzjQ5Y2wk2X03jfP3xwe+8LlhxbPr6PaVFIAOmo8BGKbh7mv2TalWTQrhlRYCFDSfPXOfh2MPEjaV2rQHzAXjipUq7XIVhICuaouDi3rdRcmJwxxMUhB4kxhxNeNi5OlF+S9iH9b1PgcUWdruMs7Ai/h1VlCfaMT8hb8cwkerXihdsgwhc7C2p3f/4A9pGmyiaStkdhWGchALSgGt12hBiEOsoMAGX1sAe1q2KvcGL0/JPHHkEKm1PiuvZ4XX+Pyvt4mXkA17tJ0HZX4aI7QKbpB5GTZ02kqAbqQtblUHdxlnIgXumhRco1Df/V0GGB4e7ciIPS12NMdqqbVpy2DQjecGPSHdqd8w0PaPu+GeddnMX7gTSmqdKHhQXV3baMCzrT3pPVXTOTyeEB6XUCgnGOruk2j9egqYk6S9Op12g4805gjWohwoI6t3VfWoix+NTbaDicJIPGpWAEXo3rhLMZPOr7aCAb18/TDbjynsjz6AFriCWGLqICUM29sva7MB/cUef7exj+ID3tRhesbn4iIrqzNqwNUrdJjA+NT6RdQupMrcW2F464myWavLloeoTlK7z9243GEljo53fac+nvE48mFNwvf64FdBbLWO6bsiN8Qh8Npn7TQGCde2UkgBLrVyHXHsmAxeG851QG4z3MWEoUpOkVEA5nvSATr8lwnRD1sKSuEATAN6+e+fvXSg0x+BVtvQfz/A7+cRX5+yNQICBwNMCBqq8sD9vVZmAIuOO+cpRU2sQcnilHsbSzWNVTeE/TNwe5jd83PWgMUm4PGU+IdmqSpeGRzH6IQVX9G+2VjG1H16gr2RjtCbSOjr69QRFqzGYYIde4198CDzyA4eQ1yKqPXu2E2Ap7fzjrmAjuAfMZNqsxjhhOmObVTPypks44lsDbvFRjKoJaRZDavo7+fBcTNoaUS5IgXqCWZUlXEMcc2/Ooj2NaIYZpFem1BnMd6Y4MCzL3LpH96SB1xyy+40rKqkRf6agqz3+IzJlKVj3jdUndwkxVNWmGZWDm9XEW1ZEWSwNq/VxSCe4LJrSZNIcUbZSgaD38sXQMHXAQFIVMVP5J7ilKALS9O/icOp9xHEfBFUdyUhm0x4MSB+zmFZn2gG/55d+oZVWs6NGPzykaQu4fgZkOb46lOt8UTPp9Zu+uM7P0yTIoSFhM2qyciynRmO7ekvKTa/OZN7RU5Hvig0fnKN9gV9dC3eNLde1jJe6oE1ImMLE8wdQgDK6uO4ZSh4KL7TD6WwG2ahhNiaw5zxGQ8BGQKHtxAWUaG4W8oHg0K2622hjRtvOHDH+zLe0XPnPDiaZ6n2IGIcXc7qrZVHyBuQ1wmROLVgCPMW4reJ5r7+TstWphitflQwvkRgYQrKKe7anvyGfzsMK37/ej65wjcms48fISf+fCgEKgSRhauOvwEpYUP+gQ3rS4L3ZUfyTqOSxfUBUxJ/xuYMZ6acFFejqfUsqw0yuOGSo0CSPYaMiRUKdRKmNRzpnCtujX7JUIYEwqSQrIuzTZrvT7W897fDZt/uw1WeaeSfPKlZ7WY9c10MV1/elspQq8LoQAJJJbMXT5mtQfCyrf5UDNciLYJ5fgcgqXDVO9m77dG6HAQLrQT8tDcvyPelrFXo8rz5KP/uJuJY5VlecYSPx7TjJHIMGdJBq0Nb3zw5NgU8cmMpIs0d9Bh4ygVYh5w+GeKPPUiKipuFqK/r/vhRKwV4pwtds1XpKpBpIlUnop6RYfUVhMZA51jxheXJdompBy7EZvAP4HMlCzNqnug1p//emvVhjx1tX0MFCVuexNYKyUTHpAmdu5Xcr8if0cM2f07D9pL+4zqz4EA5wgeqYW2vmzNz9TLYXwpo8XfgiWHUxnaEWm6C3yyu5T8yZuz13P3KgEcNF6U8wvwGNXz+L3Qouapx5XgYMn1P22vDqwsFYFg0Zw+M7P0bqYQNSEhkiBL4DFT2H9eR0c/TmlceYS87wyc0q1AOdvmZUvyaR8od14nEBa1ZwTyMQWvrfR2S0a+7YqyL8IrMt8Pz2AsIu1+62Crt8tAtJhR4lAomlaepH8svrw7Zahi2MSPoNwSaoyqFPg1GEK6fT8oDN1KoT1CXgkBr7LK58MW3adVSPC3loP8KtaukKGK5v/o/wUi8MkdrRR4x8H6T6wsmiafty6FnYaH0D+hpV2Amvi1ElSEfnvgunYecyohK186Jrr29Uivmli8loGN4KrjoucGEoFkGmi3R1InqAsMCEqDjXxHlV2kIz9ozt9+E7LZ29lLX4JQrmZXiSyn1Q7teYgPK+ozSdJ4ZcDigyINJe9+Va6ThvTe6k0rzlqGBEjycaGTe9KiAVz7j9dZ68vnVuAoNqdWHPlh4KQ41rPYjOiE6Hy4DScfUFTFMlHRR9H+tCy6O1VcsyQL6pC/jq6yWiQh1wN1zLp+CDAcniyzUMCCmuBZc7JDB4ESeJQ1qcrcv3JLuIocJEt6pvVpUUQWUIaJp2TZwaEo9EZE+dq5VzSWAOqTc9LBdoCQ5HBDDLnT8F/GDaL0/1A8Jd+w/V7c/4KgGkQ+UKwYAYU74Tl+qAiZFqFYQtJlKf5E4W0VSDO6ENZcQAAAAzrt++V15JyAXRJrX4lJ55JWjXH2/v6I3vb06hHBQbCP+KFp17yHyuefw64BBYh4o2x4x6xqIpbaMNF0Ud9fIvPEquX4J6PKiPLhz5nSsySXA80K1Qfhl7DGcYb480RLdlMLLA/DEVAaz3yBBQUfD3H45O6R0QBQ6k4M3qjFWlNiuHH+Y1Q1laSxQ7udXJvAyfYeUhhN71zGip4SylrZSZL40zbKk7JmSFrgHHOlDKqnMi5GEsD7ApQnloJ9nLg0mnFEhjVDwViTyZ6OT7T9OFJaOLMpR9JOd5/QOZHKoHCdOH72+Q18jst8LWj+aSxL6D8V9zlIzxGG8wkTFK0hwBtq43oWQzqb+rsp2UeohmzJfLprcyCY1creepjruErmHi8M5fFbh0vcBqF5m7KDt3fcynbWe3XKhQZV1zGzncfKtVvuB7JMaTzL8ymSQ7PD1vtJB/7q6MhtpP8pQ9NIPDTxVhi4bd4Uw3pl1FXZHL9VNTSG4VkzBi0z+gc5rphI0wNurpMHSN4YLjv6EVQwzXBUPB/B36uG3UkrJhfpYViXRzM3FVShV5Ku5Mg17VyLL0HiURId8Jg9BckmvjG5Nsjd+XVEwhgC8OTdJJJHS8fCyDCvj/a1XxjCuRX+6w6bO7nRPa54KWDK3LTSWHoraEqOJGHu1UiarXX4CNivQwXz0URstPtqQTEQPBhhHDYuXob3xWDwESAM0e5wZvEAu4BuzLGR8PKiCe2IULUrFNpBENs36uouT+gdNS/1X89p0RnWOam7zvtvSJHiuAB5oAAD5ilAgudQP1nYxECWWDZs7OADKPYPGsx6TkF+6YWvY6l/H7Zk+l4TvbU26vq2TtfK4sqNrcPyouT2OOh6pD/1N6+FryM6vm4YgK3U04KWj6ACglUXgvAAc5ElfN3sSXVe64SanRRAX4+KfHkBP/UeMPONIM1LpeMOKx8qnY+EzEtKSWWbh9whhn0lK2z8679x89fl+Z4F3tz9GySe1PvCxJfpJ/0DQXp7nDUAnpQAAAAAA==";

const AppStyles = () => (
  <style>{`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
:root {
--bg:#06090f; --surf:#0b1018; --panel:#0f1621; --card:#121a25;
--b1:#192840; --b2:#1e3050;
--teal:#1a7a7a; --teal-l:#2aabab; --teal-d:#0f4848;
--gold:#c9a84c; --gold-l:#e8c97a; --gold-d:#7a6030;
--navy:#0a1f3c; --blue:#164d8c; --blue-l:#1e6bc4;
--text:#ccd8e8; --mid:#7a9ab8; --dim:#3d5570;
--red:#c0392b; --red-d:#4f1208; --green:#1a7a4a; --green-l:#27ae60;
--yellow:#c49a00; --shadow:0 6px 28px rgba(0,0,0,.55);
--radius:4px;
}
[data-theme="light"] {
--bg:#edf0f5; --surf:#fff; --panel:#f5f7fa; --card:#fff;
--b1:#d0dae8; --b2:#b8c8da;
--teal:#1a7a7a; --teal-l:#0f5555; --teal-d:#cce8e8;
--gold:#8a5e10; --gold-l:#6b4808; --gold-d:#d4a84c;
--navy:#0f2d5c; --blue:#1560b0; --blue-l:#0a3a7a;
--text:#111e2e; --mid:#3d5570; --dim:#8faac0;
--red:#c0392b; --red-d:#fee; --green:#1a7a4a; --green-l:#27ae60;
--yellow:#7a5000; --shadow:0 2px 14px rgba(0,0,0,.12);
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden}
body{font-family:'IBM Plex Sans',sans-serif;background:var(--bg);color:var(--text);font-size:14px}
.pf{font-family:'Playfair Display',serif}
.mo{font-family:'IBM Plex Mono',monospace}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--surf)}
::-webkit-scrollbar-thumb{background:var(--b2);border-radius:2px}
.badge{display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:2px;font-size:10px;font-weight:600;font-family:'IBM Plex Mono',monospace;letter-spacing:.5px;text-transform:uppercase;white-space:nowrap}
.bg-teal{background:rgba(26,122,122,.18);color:var(--teal-l);border:1px solid rgba(26,122,122,.35)}
.bg-gold{background:rgba(201,168,76,.15);color:var(--gold-l);border:1px solid rgba(201,168,76,.3)}
.bg-blue{background:rgba(22,77,140,.2);color:#5aabec;border:1px solid rgba(22,77,140,.35)}
.bg-green{background:rgba(26,122,74,.18);color:#4cd98a;border:1px solid rgba(26,122,74,.35)}
.bg-red{background:rgba(192,57,43,.18);color:#e07a6e;border:1px solid rgba(192,57,43,.35)}
.bg-yellow{background:rgba(196,154,0,.15);color:#f0c842;border:1px solid rgba(196,154,0,.3)}
.bg-gray{background:rgba(122,154,184,.1);color:var(--mid);border:1px solid rgba(122,154,184,.2)}
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:var(--radius);border:1px solid transparent;font-size:12.5px;font-weight:500;font-family:inherit;cursor:pointer;transition:all .15s;white-space:nowrap}
.btn:disabled{opacity:.4;cursor:not-allowed}
.btn-teal{background:linear-gradient(135deg,var(--teal-d),var(--teal));color:#fff;border-color:var(--teal-l)}
.btn-teal:hover:not(:disabled){background:linear-gradient(135deg,var(--teal),var(--teal-l))}
.btn-gold{background:linear-gradient(135deg,#9a6c1a,var(--gold));color:#07090f;border-color:var(--gold)}
.btn-gold:hover:not(:disabled){background:linear-gradient(135deg,var(--gold),var(--gold-l))}
.btn-outline{background:transparent;color:var(--mid);border-color:var(--b2)}
.btn-outline:hover:not(:disabled){border-color:var(--teal);color:var(--text)}
.btn-red{background:var(--red-d);color:#e07a6e;border-color:var(--red)}
.btn-red:hover:not(:disabled){background:var(--red);color:#fff}
.btn-blue{background:var(--blue);color:#fff;border-color:var(--blue-l)}
.btn-blue:hover:not(:disabled){opacity:.85}
.btn-sm{padding:5px 11px;font-size:11.5px}
.btn-xs{padding:3px 7px;font-size:11px}
.card{background:var(--card);border:1px solid var(--b1);border-radius:var(--radius)}
.card-header{padding:12px 16px;border-bottom:1px solid var(--b1);display:flex;align-items:center;justify-content:space-between;gap:10px}
.card-body{padding:16px}
.inp{background:var(--surf);border:1px solid var(--b2);border-radius:var(--radius);color:var(--text);font-family:inherit;font-size:13px;padding:8px 11px;width:100%;outline:none;transition:border-color .15s}
.inp:focus{border-color:var(--teal)}
.inp::placeholder{color:var(--dim)}
select.inp{appearance:none;cursor:pointer}
textarea.inp{resize:vertical;min-height:72px}
.lbl{display:block;font-size:10px;font-weight:600;color:var(--mid);letter-spacing:.8px;text-transform:uppercase;margin-bottom:5px}
.fg{margin-bottom:13px}
.tbl{width:100%;border-collapse:collapse;font-size:12.5px}
.tbl th{background:var(--surf);color:var(--mid);font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:9px 12px;text-align:left;border-bottom:1px solid var(--b1);white-space:nowrap}
.tbl td{padding:9px 12px;border-bottom:1px solid var(--b1);vertical-align:middle}
.tbl tr:hover td{background:rgba(255,255,255,.016)}
.tbl tr:last-child td{border-bottom:none}
.sl{display:flex;align-items:center;gap:9px;padding:7px 10px;border-radius:var(--radius);color:var(--mid);font-size:12.5px;cursor:pointer;transition:all .15s;border:1px solid transparent;margin-bottom:1px;white-space:nowrap}
.sl:hover{background:rgba(26,122,122,.06);color:var(--text)}
.sl.active{background:rgba(26,122,122,.14);color:var(--teal-l);border-color:rgba(26,122,122,.25)}
.sec-label{font-size:9px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:var(--dim);padding:8px 10px 3px;margin-top:6px}
.mo-ov{position:fixed;inset:0;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;backdrop-filter:blur(5px)}
.mo-box{background:var(--panel);border:1px solid var(--b2);border-radius:5px;width:100%;max-width:540px;max-height:92vh;overflow-y:auto}
.mo-lg{max-width:740px}
.mo-hd{padding:16px 20px 12px;border-bottom:1px solid var(--b1);display:flex;align-items:center;justify-content:space-between}
.mo-bd{padding:20px}
.mo-ft{padding:12px 20px;border-top:1px solid var(--b1);display:flex;gap:8px;justify-content:flex-end}
.alrt{padding:10px 13px;border-radius:var(--radius);font-size:12px;margin-bottom:12px;display:flex;align-items:flex-start;gap:7px}
.alrt-red{background:rgba(192,57,43,.12);border:1px solid rgba(192,57,43,.3);color:#e07a6e}
.alrt-green{background:rgba(26,122,74,.12);border:1px solid rgba(26,122,74,.3);color:#4cd98a}
.alrt-blue{background:rgba(22,77,140,.12);border:1px solid rgba(22,77,140,.3);color:#5aabec}
.alrt-gold{background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.3);color:var(--gold-l)}
.alrt-teal{background:rgba(26,122,122,.1);border:1px solid rgba(26,122,122,.3);color:var(--teal-l)}
.tabs{display:flex;border-bottom:1px solid var(--b1);margin-bottom:16px}
.tab{padding:8px 14px;font-size:12.5px;color:var(--dim);cursor:pointer;border-bottom:2px solid transparent;transition:all .15s;margin-bottom:-1px}
.tab:hover{color:var(--mid)} .tab.active{color:var(--teal-l);border-bottom-color:var(--teal)}
.tline{position:relative;padding-left:16px}
.tline::before{content:'';position:absolute;left:4px;top:8px;bottom:0;width:1px;background:var(--b2)}
.tline-item{position:relative;padding-left:16px;padding-bottom:14px}
.tline-item::before{content:'';position:absolute;left:-12px;top:5px;width:7px;height:7px;border-radius:50%;background:var(--teal-d);border:1px solid var(--teal)}
.pbar{height:4px;background:var(--b1);border-radius:2px;overflow:hidden}
.pbar-fill{height:100%;border-radius:2px;transition:width .5s}
.tag{display:inline-block;padding:2px 5px;border-radius:2px;font-size:10px;font-family:'IBM Plex Mono',monospace;border:1px solid var(--b2);color:var(--mid);margin:2px}
.av{display:flex;align-items:center;justify-content:center;border-radius:50%;font-weight:700;background:var(--navy);border:1px solid var(--b2);flex-shrink:0;color:#fff}
.gl{height:2px;background:linear-gradient(90deg,var(--teal),transparent);margin-bottom:16px}
.stitle{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;margin-bottom:3px}
.ssub{font-size:11px;color:var(--dim);letter-spacing:.4px;margin-bottom:16px}
.dvd{border:none;border-top:1px solid var(--b1);margin:13px 0}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:13px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:13px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}
@media(max-width:960px){.g4{grid-template-columns:1fr 1fr}.g3{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.g2,.g3,.g4{grid-template-columns:1fr}}
.tg{color:var(--teal-l)} .tgold{color:var(--gold-l)} .tmid{color:var(--mid)} .tdim{color:var(--dim)}
.tgreen{color:#4cd98a} .tred{color:#e07a6e} .tsm{font-size:12px} .txs{font-size:11px}
.fw6{font-weight:600} .fw7{font-weight:700}
.toast-wrap{position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:7px;pointer-events:none}
.toast{padding:10px 14px;border-radius:var(--radius);font-size:12.5px;min-width:230px;max-width:300px;pointer-events:all;box-shadow:var(--shadow);display:flex;align-items:center;gap:9px;animation:slideUp .2s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.toast-info{background:var(--navy);border:1px solid var(--blue-l);color:var(--text)}
.toast-success{background:rgba(26,122,74,.22);border:1px solid rgba(26,122,74,.4);color:#4cd98a}
.toast-warn{background:rgba(196,154,0,.18);border:1px solid rgba(196,154,0,.35);color:#f0c842}
.toast-error{background:rgba(192,57,43,.2);border:1px solid rgba(192,57,43,.4);color:#e07a6e}
.notif-panel{position:absolute;top:calc(100%+8px);right:0;width:300px;background:var(--panel);border:1px solid var(--b2);border-radius:5px;box-shadow:var(--shadow);z-index:300;overflow:hidden}
.notif-item{padding:10px 13px;border-bottom:1px solid var(--b1);cursor:pointer;transition:background .1s}
.notif-item:hover{background:rgba(255,255,255,.03)}
.notif-item.unread{border-left:2px solid var(--teal)}
.notif-item:last-child{border-bottom:none}
.ndot{width:8px;height:8px;border-radius:50%;background:#e07a6e;position:absolute;top:1px;right:1px;border:1.5px solid var(--surf)}
.gs-ov{position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:900;display:flex;align-items:flex-start;justify-content:center;padding:60px 20px;backdrop-filter:blur(6px)}
.gs-box{background:var(--panel);border:1px solid var(--teal-d);border-radius:5px;width:100%;max-width:560px;overflow:hidden;box-shadow:0 0 40px rgba(26,122,122,.2)}
.gs-inp{width:100%;background:transparent;border:none;outline:none;color:var(--text);font-size:16px;font-family:inherit;padding:15px 17px}
.gs-res{padding:9px 15px;cursor:pointer;border-top:1px solid var(--b1);display:flex;align-items:center;gap:10px;transition:background .1s}
.gs-res:hover{background:rgba(26,122,122,.07)}
.cal-day-hd{display:grid;grid-template-columns:repeat(7,1fr);background:var(--surf);border-bottom:1px solid var(--b1)}
.cal-dh{padding:7px;text-align:center;font-size:10px;font-weight:600;color:var(--mid);letter-spacing:.8px;text-transform:uppercase}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:1px;background:var(--b1)}
.cal-cell{background:var(--card);min-height:86px;padding:5px;cursor:pointer;transition:background .1s;position:relative}
.cal-cell:hover{background:rgba(26,122,122,.05)}
.cal-cell.today{background:rgba(26,122,122,.08);outline:1px solid rgba(26,122,122,.25)}
.cal-cell.other{opacity:.3}
.cal-ev{border-left:2px solid var(--teal);background:rgba(26,122,122,.18);padding:2px 5px;border-radius:2px;font-size:10px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cal-ev.urgent{border-left-color:#e07a6e;background:rgba(192,57,43,.15)}
.cal-ev.done{border-left-color:#4cd98a;background:rgba(26,122,74,.12);opacity:.65}
.chat-wrap{display:grid;grid-template-columns:190px 1fr;height:560px;border:1px solid var(--b1);border-radius:var(--radius);overflow:hidden}
.chat-side{background:var(--surf);border-right:1px solid var(--b1);overflow-y:auto}
.chat-ch{padding:9px 12px;cursor:pointer;border-bottom:1px solid var(--b1);transition:background .1s;display:flex;align-items:center;gap:8px;font-size:12.5px}
.chat-ch:hover{background:rgba(255,255,255,.03)}
.chat-ch.active{background:rgba(26,122,122,.1);border-left:2px solid var(--teal);color:var(--teal-l)}
.chat-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:9px}
.msg{display:flex;gap:8px;align-items:flex-end}
.msg.mine{flex-direction:row-reverse}
.msg-bub{max-width:66%;padding:8px 11px;border-radius:3px;font-size:13px;line-height:1.5}
.msg-bub.theirs{background:var(--panel);border:1px solid var(--b1);border-radius:3px 3px 3px 0}
.msg-bub.mine{background:rgba(26,122,122,.16);border:1px solid rgba(26,122,122,.25);border-radius:3px 3px 0 3px}
.otp-wrap{display:flex;gap:10px;justify-content:center;margin:16px 0}
.otp-inp{width:46px;height:52px;text-align:center;font-size:22px;font-family:'IBM Plex Mono',monospace;background:var(--surf);border:1px solid var(--b2);border-radius:var(--radius);color:var(--text);outline:none}
.otp-inp:focus{border-color:var(--teal)}
.stat-card{background:var(--card);border:1px solid var(--b1);border-radius:var(--radius);padding:16px;position:relative;overflow:hidden}
.stat-card::after{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:var(--teal)}
.stat-card.gold::after{background:var(--gold)}
.stat-card.red::after{background:var(--red)}
.stat-card.green::after{background:var(--green-l)}
.stat-v{font-family:'IBM Plex Mono',monospace;font-size:28px;font-weight:500;color:var(--teal-l)}
.stat-v.gold{color:var(--gold-l)} .stat-v.red{color:#e07a6e} .stat-v.green{color:#4cd98a}
.stat-l{font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.8px;margin-top:3px}
.dot{width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0}
.dot-green{background:#27ae60;box-shadow:0 0 6px rgba(39,174,96,.5)}
.dot-red{background:#e07a6e;box-shadow:0 0 6px rgba(224,122,110,.5)}
.dot-yellow{background:#f0c842;box-shadow:0 0 6px rgba(240,200,66,.5)}
.dot-teal{background:var(--teal-l);box-shadow:0 0 6px rgba(42,171,171,.5)}
.dot-pulse{animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.topbar{height:52px;background:var(--surf);border-bottom:1px solid var(--b1);display:flex;align-items:center;padding:0 18px;gap:14px;flex-shrink:0}
.app-layout{display:flex;height:100vh;overflow:hidden}
.sidebar{width:220px;background:var(--surf);border-right:1px solid var(--b1);display:flex;flex-direction:column;flex-shrink:0;overflow-y:auto;transition:width .2s}
.sidebar.collapsed{width:48px}
.sidebar.collapsed .sl span,.sidebar.collapsed .sec-label,.sidebar.collapsed .sidebar-logo-text{display:none}
.main-area{flex:1;display:flex;flex-direction:column;overflow:hidden}
.page-content{flex:1;overflow-y:auto;padding:22px 24px 40px}
.pub-wrap{min-height:100vh;background:linear-gradient(160deg,var(--navy) 0%,var(--bg) 65%);display:flex;align-items:center;justify-content:center;padding:24px}
.health-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--b1);font-size:12.5px}
.health-row:last-child{border-bottom:none}
.pdf-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:2px;background:rgba(201,168,76,.1);border:1px solid var(--gold-d);color:var(--gold-l);font-size:11px;cursor:pointer;transition:all .15s;font-family:inherit}
.pdf-btn:hover{background:rgba(201,168,76,.2)}
.risk-CRITICAL{background:rgba(192,57,43,.15);color:#e07a6e;border:1px solid rgba(192,57,43,.35)}
.risk-HIGH{background:rgba(196,154,0,.12);color:#f0c842;border:1px solid rgba(196,154,0,.3)}
.risk-MEDIUM{background:rgba(22,77,140,.15);color:#5aabec;border:1px solid rgba(22,77,140,.3)}
.risk-LOW{background:rgba(26,122,74,.12);color:#4cd98a;border:1px solid rgba(26,122,74,.3)}
.seal-glow{filter:drop-shadow(0 0 14px rgba(26,122,122,.4))}
.sys-banner{background:linear-gradient(90deg,rgba(26,122,122,.12),rgba(26,122,122,.06),transparent);border:1px solid rgba(26,122,122,.2);border-radius:var(--radius);padding:10px 18px;display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:18px}
@keyframes fadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.fade{animation:fadeIn .2s ease}
.auth-bg{min-height:100vh;background:linear-gradient(140deg,#040a14 0%,#0a1a30 50%,#06090f 100%);display:flex;align-items:center;justify-content:center;padding:20px}
.auth-card{background:var(--panel);border:1px solid var(--b2);border-radius:6px;width:100%;max-width:420px;overflow:hidden}
.auth-header{background:linear-gradient(135deg,var(--navy),#0a1e38);padding:32px 28px 24px;text-align:center;border-bottom:1px solid var(--b2)}
.auth-tabs{display:flex;background:var(--surf);border-radius:var(--radius);padding:3px;margin-bottom:18px}
.auth-tab{flex:1;padding:7px;text-align:center;font-size:12.5px;border-radius:2px;cursor:pointer;transition:all .15s;color:var(--dim)}
.auth-tab.active{background:var(--card);color:var(--text)}
.discord-btn{width:100%;background:#5865F2;border:none;color:#fff;padding:10px;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;font-size:13px;font-weight:500;font-family:inherit;transition:background .15s}
.discord-btn:hover{background:#4752c4}
.auth-divider{display:flex;align-items:center;gap:12px;margin:16px 0}
.auth-divider span{flex:1;height:1px;background:var(--b1)}
.auth-divider p{font-size:11px;color:var(--dim);text-transform:uppercase;letter-spacing:1px;white-space:nowrap}
`}</style>
);

const Ico = ({ n, s = 16, c = "currentColor" }) => {
  const d = {
    home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
    briefcase: "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
    file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z",
    alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
    scale: "M12 3v18 M3 6l4 8-4 2 M21 6l-4 8 4 2 M3 6h18 M7 20a5 5 0 005 2 5 5 0 005-2H7z",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
    calendar: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z M16 2v4 M8 2v4 M3 10h18",
    chat: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    chart: "M18 20V10 M12 20V4 M6 20v-6",
    lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 0110 0v4",
    check: "M20 6L9 17l-5-5",
    x: "M18 6L6 18 M6 6l12 12",
    plus: "M12 5v14 M5 12h14",
    edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    trash: "M3 6h18 M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
    download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
    eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
    fingerprint: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4",
    book: "M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
    menu: "M3 12h18 M3 6h18 M3 18h18",
    moon: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
    sun: "M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 5a7 7 0 100 14A7 7 0 0012 5z",
    server: "M2 9a3 3 0 013-3h14a3 3 0 013 3v1a3 3 0 01-3 3H5a3 3 0 01-3-3V9z M2 15a3 3 0 013-3h14a3 3 0 013 3v1a3 3 0 01-3 3H5a3 3 0 01-3-3v-1z M6 9h.01 M6 15h.01",
    activity: "M22 12h-4l-3 9L9 3l-3 9H2",
    globe: "M12 2a10 10 0 110 20A10 10 0 0112 2z M2 12h20 M12 2a15.3 15.3 0 010 20 M12 2a15.3 15.3 0 000 20",
    discord: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z",
    chevron_down: "M6 9l6 6 6-6",
    chevron_right: "M9 18l6-6-6-6",
    building: "M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18H6z M6 12H4a2 2 0 00-2 2v6h4 M18 9h2a2 2 0 012 2v9h-4 M10 6h4 M10 10h4 M10 14h4 M10 18h4",
    cpu: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    clipboard: "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2 M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z",
    hammer: "M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 010-3L12 9 M17.64 15L22 10.64 M20.35 6.35L17.64 9.06a1.5 1.5 0 01-2.12 0L14.7 8.24a1.5 1.5 0 010-2.12L17.41 3.5a4.24 4.24 0 000 6l-1 1",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    info: "M12 8h.01 M12 11v5 M12 22a10 10 0 110-20 10 10 0 010 20z",
    excl: "M12 22a10 10 0 110-20 10 10 0 010 20z M12 8v4 M12 16h.01",
    id_card: "M2 4h20a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2z M8 11a2 2 0 100-4 2 2 0 000 4z M14 9h4 M14 13h4 M5 18l3-3 M11 18l-3-3",
  };
  const path = d[n] || d.info;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {path.split(" M").map((seg, i) => <path key={i} d={i === 0 ? seg : "M" + seg} />)}
    </svg>
  );
};

let _setToasts = null;
const toast = (msg, type = "info") => {
  if (_setToasts) {
    const id = Date.now();
    _setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => _setToasts(t => t.filter(x => x.id !== id)), 3500);
  }
};
const ToastHost = () => {
  const [toasts, setToasts] = useState([]);
  useEffect(() => { _setToasts = setToasts; return () => { _setToasts = null; }; }, []);
  const icons = { success: "check", error: "x", warn: "alert", info: "info" };
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <Ico n={icons[t.type] || "info"} s={14} />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
};

let _setPdfModal = null;

const printDoc = (title, html) => {
  const fullHtml = `<!DOCTYPE html><html><head><title>${title}</title><style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Georgia,serif;color:#111;padding:48px;max-width:780px;margin:auto;background:#fff}
    h1{font-size:20px;text-align:center;letter-spacing:2px;margin-bottom:4px;text-transform:uppercase}
    h2{font-size:16px;margin-bottom:6px}
    .sub{text-align:center;font-size:12px;color:#555;margin-bottom:28px;letter-spacing:1px}
    hr{border:none;border-top:2px solid #111;margin:18px 0}
    hr.thin{border-top-width:1px;border-color:#aaa}
    table{width:100%;border-collapse:collapse;font-size:13px;margin-top:16px}
    th{background:#f0f0f0;padding:7px 11px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.5px;border:1px solid #ccc}
    td{padding:7px 11px;border:1px solid #ddd}
    .field{margin-bottom:12px}
    .fl{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#555;margin-bottom:3px}
    .fv{font-size:14px;font-weight:500}
    .footer{margin-top:36px;text-align:center;font-size:10px;color:#888;border-top:1px solid #ccc;padding-top:12px}
    .seal{text-align:center;margin-bottom:20px}
    .seal img{width:80px;height:80px;object-fit:contain}
    .badge{display:inline-block;padding:2px 8px;border:1px solid #999;border-radius:3px;font-size:11px;font-family:monospace}
  </style></head><body>
    <div class="seal"><img src="${SEAL_B64}" /></div>
    <h1>Department of Justice</h1>
    <div class="sub">LOS SANTOS · OUTLAW · OFFICIAL DOCUMENT</div>
    <hr />
    ${html}
    <div class="footer">Generated by DOJ Secure Portal &nbsp;·&nbsp; ${new Date().toLocaleString()} &nbsp;·&nbsp; Digitally Authorized &nbsp;·&nbsp; ${title}</div>
  </body></html>`;

  if (_setPdfModal) {
    _setPdfModal({ open: true, title, html: fullHtml });
  }
};

const PdfModal = () => {
  const [state, setState] = useState({ open: false, title: "", html: "" });
  const iframeRef = useRef();
  useEffect(() => { _setPdfModal = setState; return () => { _setPdfModal = null; }; }, []);

  if (!state.open) return null;

  const handlePrint = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  const handleDownload = () => {
    const blob = new Blob([state.html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.title.replace(/[^a-z0-9]/gi, "_")}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Document downloaded as HTML — open in browser to print as PDF", "success");
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.82)", zIndex:2000, display:"flex", flexDirection:"column", padding:20, gap:12 }}>
      {}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"var(--panel)", border:"1px solid var(--b2)", borderRadius:4, padding:"10px 16px", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <img src={SEAL_B64} style={{ width:28, height:28, objectFit:"contain" }} alt="DOJ" />
          <div>
            <div style={{ fontWeight:700, fontSize:13 }}>{state.title}</div>
            <div style={{ fontSize:11, color:"var(--dim)" }}>DOJ Official Document · Preview</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn btn-teal btn-sm" onClick={handlePrint}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print / Save as PDF
          </button>
          <button className="btn btn-gold btn-sm" onClick={handleDownload}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download HTML
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => setState(s => ({ ...s, open: false }))}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Close
          </button>
        </div>
      </div>
      {}
      <div style={{ background:"rgba(26,122,122,.1)", border:"1px solid rgba(26,122,122,.25)", borderRadius:3, padding:"8px 14px", fontSize:12, color:"var(--teal-l)", flexShrink:0 }}>
        💡 Click <strong>Print / Save as PDF</strong> → in the print dialog choose <strong>"Save as PDF"</strong> as the destination to export a PDF file.
      </div>
      {}
      <div style={{ flex:1, background:"#e8e8e8", borderRadius:4, overflow:"hidden", border:"1px solid var(--b2)" }}>
        <iframe
          ref={iframeRef}
          srcDoc={state.html}
          style={{ width:"100%", height:"100%", border:"none", background:"#fff" }}
          title="Document Preview"
          sandbox="allow-same-origin allow-modals allow-scripts"
        />
      </div>
    </div>
  );
};

const ROLES = {
  ADMIN:              { label:"System Administrator",    level:10, color:"gold",   stars:0,  icon:"⚙" },
  DOJ_CHIEF:          { label:"Chief of DOJ",            level:9,  color:"gold",   stars:6,  icon:"★" },
  DEPUTY_CHIEF:       { label:"Deputy of DOJ",           level:8,  color:"gold",   stars:5,  icon:"★" },
  GENERAL_JUDGE:      { label:"General Judge",           level:8,  color:"teal",   stars:0,  icon:"⚖" },
  SENIOR_LEAD_JUDGE:  { label:"Senior Lead Judge",       level:7,  color:"teal",   stars:0,  icon:"⚖" },
  LEAD_JUDGE:         { label:"Lead Judge",              level:7,  color:"teal",   stars:0,  icon:"⚖" },
  JUDGE:              { label:"Judge",                   level:6,  color:"blue",   stars:0,  icon:"⚖" },
  BAR_HEAD:           { label:"Head of Bar Association", level:7,  color:"teal",   stars:0,  icon:"⚖" },
  BAR_SUPERVISOR:     { label:"Bar Association Supervisor",level:6, color:"blue",  stars:0,  icon:"⚖" },
  BAR_MEMBER:         { label:"Bar Association Member",  level:5,  color:"blue",   stars:0,  icon:"⚖" },
  HEAD_LAWYER:        { label:"Head Lawyer",             level:5,  color:"blue",   stars:0,  icon:"⚖" },
  SENIOR_LAWYER:      { label:"Senior Lawyer",           level:4,  color:"blue",   stars:0,  icon:"⚖" },
  LAWYER:             { label:"Lawyer",                  level:3,  color:"blue",   stars:0,  icon:"⚖" },
  TRAINEE:            { label:"Training Lawyer",         level:2,  color:"gray",   stars:0,  icon:"⚖" },
  CITIZEN:            { label:"Citizen",                 level:1,  color:"gray",   stars:0,  icon:"👤" },
};

const DOJ_ROLES = [
  "ADMIN","DOJ_CHIEF","DEPUTY_CHIEF",
  "GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE",
  "BAR_HEAD","BAR_SUPERVISOR","BAR_MEMBER",
  "HEAD_LAWYER","SENIOR_LAWYER","LAWYER","TRAINEE",
];

const PERMS = {
  DASHBOARD_VIEW:   [...DOJ_ROLES],

  CASE_VIEW:        [...DOJ_ROLES],
  CASE_CREATE:      ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","BAR_HEAD","BAR_SUPERVISOR","HEAD_LAWYER","SENIOR_LAWYER","LAWYER"],
  CASE_EDIT:        ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","HEAD_LAWYER","SENIOR_LAWYER"],
  CASE_CLOSE:       ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
  CASE_DELETE:      ["ADMIN","DOJ_CHIEF"],

  DOC_VIEW:         [...DOJ_ROLES],
  DOC_UPLOAD:       ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","HEAD_LAWYER","SENIOR_LAWYER","LAWYER"],
  DOC_DELETE:       ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"],

  EVIDENCE_VIEW:    [...DOJ_ROLES],
  EVIDENCE_UPLOAD:  ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","BAR_HEAD","BAR_SUPERVISOR","HEAD_LAWYER","SENIOR_LAWYER","LAWYER"],
  EVIDENCE_VERIFY:  ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE"],
  EVIDENCE_DELETE:  ["ADMIN","DOJ_CHIEF"],

  CRIMINAL_VIEW:    [...DOJ_ROLES],
  CRIMINAL_EDIT:    ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"],

  CITIZEN_VIEW:     [...DOJ_ROLES],

  CASE_FOLDER_VIEW: [...DOJ_ROLES],

  LEGAL_DOC_VIEW:   [...DOJ_ROLES],

  PLEA_VIEW:        [...DOJ_ROLES],
  PLEA_MANAGE:      ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","HEAD_LAWYER","SENIOR_LAWYER","LAWYER"],

  WARRANT_VIEW:     ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE","HEAD_LAWYER","SENIOR_LAWYER","LAWYER"],
  WARRANT_REQUEST:  ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","HEAD_LAWYER","SENIOR_LAWYER","LAWYER"],
  WARRANT_ISSUE:    ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
  WARRANT_EXECUTE:  ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"],

  USER_VIEW:        ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"],
  USER_MANAGE:      ["ADMIN","DOJ_CHIEF"],
  ROLE_ASSIGN:      ["ADMIN"],

  BAR_VIEW:         ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","BAR_HEAD","BAR_SUPERVISOR","BAR_MEMBER","HEAD_LAWYER","SENIOR_LAWYER","LAWYER","TRAINEE"],
  BAR_MANAGE:       ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","BAR_HEAD","BAR_SUPERVISOR"],
  BAR_LICENSE:      ["ADMIN","DOJ_CHIEF","BAR_HEAD"],
  BAR_DISCIPLINE:   ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","BAR_HEAD","BAR_SUPERVISOR"],

  COURT_VIEW:       ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE","HEAD_LAWYER","SENIOR_LAWYER","LAWYER"],
  COURT_SCHEDULE:   ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE"],
  RULING_ISSUE:     ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],

  ADMIN_PANEL:      ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"],
  AUDIT_VIEW:       ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"],
  SYSTEM_CONFIG:    ["ADMIN"],

  JUDGE_ACCESS:     ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
  JUDGE_RULING:     ["GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
  JUDGE_LOCK_CASE:  ["GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
  JUDGE_NOTE:       ["GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
  JUDGE_DOC_UPLOAD: ["GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
  JUDGE_REPORT:     ["GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
  JUDGE_WARRANT:    ["GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
  JUDGE_SCHEDULE:   ["GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
  JUDGE_SENIOR:     ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE"],
  JUDGE_AUDIT_VIEW: ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],
};

const isDOJRole = (role) => DOJ_ROLES.includes(role);

const hasPerm = (role, perm) => (PERMS[perm] || []).includes(role);
const canDo = (role, minLevel) => (ROLES[role]?.level || 0) >= minLevel;
const mkToken = u => `jwt.${btoa(JSON.stringify({ id: u.id, username: u.username, role: u.role }))}.sig`;

const Guard = ({ user, perm, minLevel, fallback, children }) => {
  const ok = perm ? hasPerm(user?.role, perm) : canDo(user?.role, minLevel||0);
  if (!ok) return fallback || (
    <div className="alrt alrt-red" style={{ margin:"24px 0" }}>
      <Ico n="lock" s={14}/> Access Denied — Your role (<strong>{ROLES[user?.role]?.label}</strong>) does not have permission to view this section.
    </div>
  );
  return children;
};

const DOJ_SERVER = {
  id:        "1302641891428003861",           // Discord Guild/Server ID
  name:      "Department of Justice — Los Santos Outlaw",
  shortName: "DOJ Los Santos",
  invite:    "https://discord.gg/losSantosOutlaw",
  icon:      "⚖",
};

const DISCORD_ROLE_MAP = {
  "Administrator":              "ADMIN",
  "Admin":                      "ADMIN",
  "Chief of DOJ":               "DOJ_CHIEF",
  "Deputy of DOJ":              "DEPUTY_CHIEF",
  "General Judge":              "GENERAL_JUDGE",
  "Senior Lead Judge":          "SENIOR_LEAD_JUDGE",
  "Lead Judge":                 "LEAD_JUDGE",
  "Judge":                      "JUDGE",
  "Head of Bar Association":    "BAR_HEAD",
  "Bar Association Supervisor": "BAR_SUPERVISOR",
  "Bar Association Member":     "BAR_MEMBER",
  "Head Lawyer":                "HEAD_LAWYER",
  "Senior Lawyer":              "SENIOR_LAWYER",
  "Lawyer":                     "LAWYER",
  "Training Lawyer":            "TRAINEE",
};

const DISCORD_ROLE_PRIORITY = [
  "Administrator","Admin","Chief of DOJ","Deputy of DOJ",
  "General Judge","Senior Lead Judge","Lead Judge","Judge",
  "Head of Bar Association","Bar Association Supervisor","Bar Association Member",
  "Head Lawyer","Senior Lawyer","Lawyer","Training Lawyer",
];

const DOJ_DISCORD_SERVER_ID   = "1227422529656983582";
const DOJ_DISCORD_SERVER_NAME = "Department of Justice — LOS SANTOS OUTLAW";

const DOJ_SERVER_MEMBERS = {
  "admin":        { serverMember:true, serverId:"1227422529656983582", roles:["Administrator","Admin"],          avatar:"🔧", discordId:"admin",        verified:true },
  "_n2a":         { serverMember:true, serverId:"1227422529656983582", roles:["Chief of DOJ","Administrator"],   avatar:"👑", discordId:"_n2a",          verified:true },
  "abo3th":       { serverMember:true, serverId:"1227422529656983582", roles:["Deputy of DOJ"],                  avatar:"⭐", discordId:"abo3th",         verified:true },
  "z.th":         { serverMember:true, serverId:"1227422529656983582", roles:["Senior Lawyer"],                  avatar:"⚖",  discordId:"z.th",           verified:true },
  "abo3th_judge": { serverMember:true, serverId:"1227422529656983582", roles:["Judge"],                          avatar:"⚖",  discordId:"abo3th_judge",   verified:true },
  "z.th_judge":   { serverMember:true, serverId:"1227422529656983582", roles:["Judge"],                          avatar:"⚖",  discordId:"z.th_judge",     verified:true },
  "K3Q8":         { serverMember:true, serverId:"1227422529656983582", roles:["Judge"],                          avatar:"⚖",  discordId:"K3Q8",           verified:true },
  "sultan13579":  { serverMember:true, serverId:"1227422529656983582", roles:["Head of Bar Association"],        avatar:"🏛", discordId:"sultan13579",    verified:true },
  "y3_4":         { serverMember:true, serverId:"1227422529656983582", roles:["Bar Association Supervisor"],     avatar:"📋", discordId:"y3_4",           verified:true },
  "albsof0556":   { serverMember:true, serverId:"1227422529656983582", roles:["Bar Association Supervisor"],     avatar:"📋", discordId:"albsof0556",     verified:true },
  "o.s45":        { serverMember:true, serverId:"1227422529656983582", roles:["Senior Lawyer"],                  avatar:"📄", discordId:"o.s45",          verified:true },
  "df_511":       { serverMember:true, serverId:"1227422529656983582", roles:["Senior Lawyer"],                  avatar:"📄", discordId:"df_511",         verified:true },
  "l3pd":         { serverMember:true, serverId:"1227422529656983582", roles:["Senior Lawyer"],                  avatar:"📄", discordId:"l3pd",           verified:true },
  "ay_mnx":       { serverMember:true, serverId:"1227422529656983582", roles:["Lawyer"],                         avatar:"📄", discordId:"ay_mnx",         verified:true },
  "cvv1":         { serverMember:true, serverId:"1227422529656983582", roles:["Lawyer"],                         avatar:"📄", discordId:"cvv1",           verified:true },
  "az511az":      { serverMember:true, serverId:"1227422529656983582", roles:["Lawyer"],                         avatar:"📄", discordId:"az511az",        verified:true },
  "g.lok_":       { serverMember:true, serverId:"1227422529656983582", roles:["Lawyer"],                         avatar:"📄", discordId:"g.lok_",         verified:true },
  "lcfeer":       { serverMember:true, serverId:"1227422529656983582", roles:["Lawyer"],                         avatar:"📄", discordId:"lcfeer",         verified:true },
  "rrb6":         { serverMember:true, serverId:"1227422529656983582", roles:["Lawyer"],                         avatar:"📄", discordId:"rrb6",           verified:true },
  "t10x":         { serverMember:true, serverId:"1227422529656983582", roles:["Training Lawyer"],                avatar:"📘", discordId:"t10x",           verified:true },
  "ez.95":        { serverMember:true, serverId:"1227422529656983582", roles:["Training Lawyer"],                avatar:"📘", discordId:"ez.95",          verified:true },
  "gilrx":        { serverMember:true, serverId:"1227422529656983582", roles:["Training Lawyer"],                avatar:"📘", discordId:"gilrx",          verified:true },
  "atty.cho":     { serverMember:true, serverId:"1227422529656983582", roles:["Lawyer"],                         avatar:"📄", discordId:"atty.cho",       verified:true },
};

const resolveDiscordRole = (discordRoles = []) => {
  for (const r of DISCORD_ROLE_PRIORITY) {
    if (discordRoles.includes(r) && DISCORD_ROLE_MAP[r]) return DISCORD_ROLE_MAP[r];
  }
  return null; // null = not an authorized DOJ role (access denied)
};

// ZERO-TRUST DISCORD SERVER GATEWAY — Server ID: 1227422529656983582
const verifyServerMembership = (discordUsername) => {
  const key = discordUsername.trim();

  // ── GATE 1: Username must exist in server member registry ────────────────
  const memberKey = Object.keys(DOJ_SERVER_MEMBERS).find(
    k => k.toLowerCase() === key.toLowerCase()
  );
  if (!memberKey) return {
    authorized: false,
    reason: `"${key}" is not a member of DOJ Discord server ${DOJ_DISCORD_SERVER_ID}. Only verified server members may access this platform.`,
    code: "NOT_IN_SERVER"
  };

  const member = DOJ_SERVER_MEMBERS[memberKey];

  // ── GATE 2: serverId must exactly match 1227422529656983582 ───────────────
  if (member.serverId !== DOJ_DISCORD_SERVER_ID) return {
    authorized: false,
    reason: `Server ID mismatch for "${memberKey}". Expected ${DOJ_DISCORD_SERVER_ID}.`,
    code: "SERVER_MISMATCH"
  };

  // ── GATE 3: serverMember must be explicitly true (blocks kicked/banned) ──
  if (!member.serverMember) return {
    authorized: false,
    reason: `"${memberKey}" has been removed from the DOJ Discord server. Access permanently revoked.`,
    code: "MEMBER_REMOVED"
  };

  // ── GATE 4: Must have at least one recognized DOJ role ────────────────────
  const resolvedRole = resolveDiscordRole(member.roles || []);
  if (!resolvedRole) return {
    authorized: false,
    reason: `"${memberKey}" has no authorized DOJ role in server ${DOJ_DISCORD_SERVER_ID}. Contact an administrator.`,
    code: "NO_DOJ_ROLE"
  };

  return {
    authorized: true,
    memberKey,
    member,
    resolvedRole,
    discordRoles: member.roles || [],
    serverId: DOJ_DISCORD_SERVER_ID,
    serverName: DOJ_DISCORD_SERVER_NAME,
  };
};

const INIT_USERS = [
  { id:"USR-000", username:"admin",          password:"admin123",  role:"ADMIN",             email:"admin@doj.gov",       discordId:null,             active:true,  joined:"2024-01-01", phone:"", bio:"System administrator. Full platform access.", citizenId:"SYS00001", charName:"System Admin", points:0, section:"" },
  { id:"USR-001", username:"_n2a",           password:"chief123",  role:"DOJ_CHIEF",          email:"chief@doj.gov",       discordId:"_n2a",           active:true,  joined:"2024-01-01", phone:"", bio:"Chief of DOJ — 6 Stars",  citizenId:"",         charName:"Nasser Altamimi",    points:0,    section:"",    badge:true },
  { id:"USR-002", username:"abo3th",         password:"dep123",    role:"DEPUTY_CHIEF",       email:"deputy@doj.gov",      discordId:"abo3th",         active:true,  joined:"2024-01-10", phone:"", bio:"Deputy of DOJ — 5 Stars", citizenId:"",         charName:"AUBYD Albaghdadi",   points:0,    section:"",    badge:true },
  { id:"USR-J01", username:"abo3th_judge",   password:"judge123",  role:"JUDGE",              email:"judge1@doj.gov",      discordId:"abo3th",         active:true,  joined:"2024-01-10", phone:"", bio:"Urgent Court Judge",      citizenId:"",         charName:"Marai AShamry",      points:2500, section:"U.C", court:"Urgent Court", badge:true },
  { id:"USR-J02", username:"z.th_judge",     password:"judge123",  role:"JUDGE",              email:"judge2@doj.gov",      discordId:"z.th",           active:true,  joined:"2024-02-01", phone:"", bio:"Urgent Court Judge",      citizenId:"JWJ82738", charName:"FAST RAGNR",         points:2500, section:"U.C", court:"Urgent Court", badge:true },
  { id:"USR-J03", username:"K3Q8",           password:"judge123",  role:"JUDGE",              email:"judge3@doj.gov",      discordId:"K3Q8",           active:true,  joined:"2024-02-15", phone:"", bio:"Urgent Court Judge",      citizenId:"APM19272", charName:"Yakyaki saad",       points:2500, section:"U.C", court:"Urgent Court", badge:true },
  { id:"USR-S01", username:"z.th",           password:"atty123",   role:"SENIOR_LAWYER",      email:"z.th@doj.gov",        discordId:"z.th",    active:true,  joined:"2024-02-01", phone:"", bio:"Senior Lawyer — A.S Section", citizenId:"JWJ82739", charName:"FAST RAGNR",        points:687, section:"A.S", badge:true },
  { id:"USR-S02", username:"sultan13579",    password:"bar123",    role:"BAR_HEAD",            email:"sultan@doj.gov",      discordId:"sultan13579",active:true,joined:"2024-02-10",phone:"",bio:"Head of Bar Association", citizenId:"IZN54524",        charName:"Sultan Mohammed",    points:621, section:"BAR", badge:true },
  { id:"USR-S03", username:"o.s45",          password:"atty123",   role:"SENIOR_LAWYER",      email:"o.s45@doj.gov",       discordId:"o.s45",   active:true,  joined:"2024-03-01", phone:"", bio:"Senior Lawyer", citizenId:"THU34873",             charName:"Ghaith bin Abdullah",points:380, section:"",    badge:true },
  { id:"USR-S04", username:"df_511",         password:"atty123",   role:"SENIOR_LAWYER",      email:"df511@doj.gov",       discordId:"df_511",  active:true,  joined:"2024-03-10", phone:"", bio:"Senior Lawyer", citizenId:"BQ61229",              charName:"Dhaifullah Alotaibi",points:354, section:"",    badge:true },
  { id:"USR-S05", username:"y3_4",           password:"bar123",    role:"BAR_SUPERVISOR",     email:"y3.4@doj.gov",        discordId:"y3_4",    active:true,  joined:"2024-04-01", phone:"", bio:"Bar Association Supervisor", citizenId:"sgm66212",     charName:"Yousef Alsharif",    points:352, section:"BAR", badge:true },
  { id:"USR-S06", username:"albsof0556",     password:"bar123",    role:"BAR_SUPERVISOR",     email:"albsof@doj.gov",      discordId:"albsof0556",active:true,joined:"2024-04-10",phone:"",bio:"Bar Association Supervisor", citizenId:"UDS19390",    charName:"Aegon Targaryen",    points:295, section:"BAR", badge:true },
  { id:"USR-S07", username:"l3pd",           password:"atty123",   role:"SENIOR_LAWYER",      email:"l3pd@doj.gov",        discordId:"l3pd",    active:true,  joined:"2024-05-01", phone:"", bio:"Senior Lawyer", citizenId:"GPB27979",             charName:"Victor Ross",        points:127, section:"",    badge:true },
  { id:"USR-L01", username:"ay_mnx",         password:"atty123",   role:"LAWYER",             email:"ay.mnx@doj.gov",      discordId:"ay_mnx",  active:true,  joined:"2024-05-10", phone:"", bio:"Lawyer", citizenId:"YXL86264",                  charName:"ALIX ALEXANDER",     points:154, section:"",    badge:true },
  { id:"USR-L02", username:"cvv1",           password:"atty123",   role:"LAWYER",             email:"cvv1@doj.gov",        discordId:"cvv1",    active:true,  joined:"2024-06-01", phone:"", bio:"Lawyer", citizenId:"FQF97647",                  charName:"Abdulaziz Mohammed", points:127, section:"",    badge:true },
  { id:"USR-L03", username:"az511az",        password:"atty123",   role:"LAWYER",             email:"az511@doj.gov",       discordId:"az511az", active:true,  joined:"2024-06-10", phone:"", bio:"Lawyer", citizenId:"FHH20128",                  charName:"Mahmas Hashr",       points:122, section:"",    badge:true },
  { id:"USR-L04", username:"g.lok_",         password:"atty123",   role:"LAWYER",             email:"g.lok@doj.gov",       discordId:"g.lok_",  active:true,  joined:"2024-07-01", phone:"", bio:"Lawyer", citizenId:"RTM85774",                  charName:"Alexander Carlos",   points:76,  section:"",    badge:false },
  { id:"USR-L05", username:"lcfeer",         password:"atty123",   role:"LAWYER",             email:"lcfeer@doj.gov",      discordId:"lcfeer",  active:true,  joined:"2024-07-10", phone:"", bio:"Lawyer", citizenId:"ZAL02059",                  charName:"Muhammad mutaq",     points:75,  section:"",    badge:true },
  { id:"USR-L06", username:"rrb6",           password:"atty123",   role:"LAWYER",             email:"rrb6@doj.gov",        discordId:"rrb6",    active:true,  joined:"2024-08-01", phone:"", bio:"Lawyer", citizenId:"MAV69959",                  charName:"Valentino AlShammari",points:110,section:"",    badge:true },
  { id:"USR-T01", username:"t10x",           password:"train123",  role:"TRAINEE",            email:"t10x@doj.gov",        discordId:"t10x",    active:true,  joined:"2025-01-01", phone:"", bio:"Training Lawyer", citizenId:"PFF33082",              charName:"Silver Morgan",      points:0, section:"",    badge:true },
  { id:"USR-T02", username:"ez.95",          password:"train123",  role:"TRAINEE",            email:"ez.95@doj.gov",       discordId:"ez.95",   active:true,  joined:"2025-01-15", phone:"", bio:"Training Lawyer", citizenId:"DEE97656",              charName:"Victor Graves",      points:0, section:"",    badge:true },
  { id:"USR-T03", username:"gilrx",          password:"train123",  role:"TRAINEE",            email:"gilrx@doj.gov",       discordId:"gilrx",   active:true,  joined:"2025-02-01", phone:"", bio:"Training Lawyer", citizenId:"YRA78440",              charName:"Rod Saljoq",         points:0, section:"",    badge:false },
  { id:"USR-X01", username:"atty.cho",       password:"cho123",    role:"LAWYER",             email:"cho@doj.gov",         discordId:null,      active:false, joined:"2023-09-15", phone:"", bio:"SUSPENDED — professional conduct violation.", citizenId:"", charName:"Edward Cho", points:0, section:"", badge:false },
];

const POINTS_CONFIG = {
  CASE_FILE:        { pts: 50,  label: "Case Filed",          color: "teal"  },
  CASE_CLOSE:       { pts: 100, label: "Case Closed",         color: "teal"  },
  EVIDENCE_UPLOAD:  { pts: 30,  label: "Evidence Uploaded",   color: "blue"  },
  EVIDENCE_VERIFY:  { pts: 50,  label: "Evidence Verified",   color: "blue"  },
  WARRANT_ISSUE:    { pts: 40,  label: "Warrant Issued",      color: "gold"  },
  VERDICT_WIN:      { pts: 150, label: "Case Won",            color: "green" },
  VERDICT_LOSS:     { pts: 20,  label: "Case Closed (Loss)",  color: "gray"  },
  HEARING_ATTEND:   { pts: 25,  label: "Hearing Conducted",   color: "blue"  },
  PLEA_DEAL:        { pts: 60,  label: "Plea Deal Secured",   color: "teal"  },
  FINE_MISCONDUCT:  { pts: -100, label: "Misconduct Fine",    color: "red"   },
  FINE_LATE:        { pts: -25,  label: "Late Filing",        color: "red"   },
  FINE_ABSENSE:     { pts: -50,  label: "Unexcused Absence",  color: "red"   },
  FINE_CONTEMPT:    { pts: -75,  label: "Contempt of Court",  color: "red"   },
  DISCIPLINARY:     { pts: -200, label: "Disciplinary Action",color: "red"   },
};

const RANK_THRESHOLDS = {
  TRAINEE:       { min: 0,    max: 199,  label: "Training Lawyer",  color: "gray",  icon: "📋" },
  LAWYER:        { min: 200,  max: 499,  label: "Lawyer",           color: "blue",  icon: "⚖"  },
  SENIOR_LAWYER: { min: 500,  max: 999,  label: "Senior Lawyer",    color: "teal",  icon: "⚖⚖" },
  HEAD_LAWYER:   { min: 1000, max: 1999, label: "Head Lawyer",      color: "gold",  icon: "★"  },
  DOJ_CHIEF:     { min: 2000, max: 9999, label: "Chief Tier",       color: "gold",  icon: "★★★"},
};

const getRankFromPoints = (pts) => {
  for (const [key, r] of Object.entries(RANK_THRESHOLDS)) {
    if (pts >= r.min && pts <= r.max) return { key, ...r };
  }
  return { key:"TRAINEE", ...RANK_THRESHOLDS.TRAINEE };
};

const getNextRank = (pts) => {
  const entries = Object.entries(RANK_THRESHOLDS);
  for (let i = 0; i < entries.length - 1; i++) {
    const [, r] = entries[i];
    const [, next] = entries[i+1];
    if (pts >= r.min && pts <= r.max) return next;
  }
  return null;
};

const INIT_CASES = []; // Cleared 2026-03-05T20:00:00.000Z — 5 AI/demo entries removed by admin cleanup

const INIT_LAWYERS = [
  { id:"LIC-S01", discord:"z.th",        name:"FAST RAGNR",           rank:"SENIOR_LAWYER", badge:"DOJ-SR-0001", status:"ACTIVE",    spec:"Criminal Law",        cases:52, winRate:87, points:687, section:"A.S", citizenId:"JWJ82739", licensed:"2023-01-15", expires:"2026-01-15", hasBadge:true  },
  { id:"LIC-S02", discord:"sultan13579", name:"Sultan Mohammed",      rank:"BAR_HEAD",      badge:"DOJ-BA-0001", status:"ACTIVE",    spec:"Bar Association",     cases:38, winRate:79, points:621, section:"BAR", citizenId:"IZN54524", licensed:"2023-03-01", expires:"2026-03-01", hasBadge:true  },
  { id:"LIC-S03", discord:"o.s45",       name:"Ghaith bin Abdullah",  rank:"SENIOR_LAWYER", badge:"DOJ-SR-0003", status:"ACTIVE",    spec:"Criminal Defense",    cases:31, winRate:74, points:380, section:"",    citizenId:"THU34873", licensed:"2023-04-10", expires:"2026-04-10", hasBadge:true  },
  { id:"LIC-S04", discord:"df_511",      name:"Dhaifullah Alotaibi",  rank:"SENIOR_LAWYER", badge:"DOJ-SR-0004", status:"ACTIVE",    spec:"Corporate Law",       cases:28, winRate:71, points:354, section:"",    citizenId:"BQ61229",  licensed:"2023-05-20", expires:"2026-05-20", hasBadge:true  },
  { id:"LIC-S05", discord:"y3_4",        name:"Yousef Alsharif",      rank:"BAR_SUPERVISOR",badge:"DOJ-BA-0002", status:"ACTIVE",    spec:"Bar Association",     cases:27, winRate:70, points:352, section:"BAR", citizenId:"sgm66212", licensed:"2023-06-01", expires:"2026-06-01", hasBadge:true  },
  { id:"LIC-S06", discord:"albsof0556",  name:"Aegon Targaryen",      rank:"BAR_SUPERVISOR",badge:"DOJ-BA-0003", status:"ACTIVE",    spec:"Bar Association",     cases:20, winRate:65, points:295, section:"BAR", citizenId:"UDS19390", licensed:"2023-07-15", expires:"2026-07-15", hasBadge:true  },
  { id:"LIC-S07", discord:"l3pd",        name:"Victor Ross",          rank:"SENIOR_LAWYER", badge:"DOJ-SR-0007", status:"ACTIVE",    spec:"Immigration Law",     cases:11, winRate:60, points:127, section:"",    citizenId:"GPB27979", licensed:"2023-09-01", expires:"2026-09-01", hasBadge:true  },
  { id:"LIC-L01", discord:"ay_mnx",      name:"ALIX ALEXANDER",       rank:"LAWYER",        badge:"DOJ-LW-0001", status:"ACTIVE",    spec:"Criminal Law",        cases:14, winRate:64, points:154, section:"",    citizenId:"YXL86264", licensed:"2024-01-10", expires:"2026-01-10", hasBadge:true  },
  { id:"LIC-L02", discord:"cvv1",        name:"Abdulaziz Mohammed",   rank:"LAWYER",        badge:"DOJ-LW-0002", status:"ACTIVE",    spec:"Civil Litigation",    cases:11, winRate:60, points:127, section:"",    citizenId:"FQF97647", licensed:"2024-02-01", expires:"2026-02-01", hasBadge:true  },
  { id:"LIC-L03", discord:"az511az",     name:"Mahmas Hashr",         rank:"LAWYER",        badge:"DOJ-LW-0003", status:"ACTIVE",    spec:"Traffic Law",         cases:10, winRate:58, points:122, section:"",    citizenId:"FHH20128", licensed:"2024-03-01", expires:"2026-03-01", hasBadge:true  },
  { id:"LIC-L04", discord:"g.lok_",      name:"Alexander Carlos",     rank:"LAWYER",        badge:"DOJ-LW-0004", status:"PENDING",   spec:"Corporate Law",       cases:6,  winRate:52, points:76,  section:"",    citizenId:"RTM85774", licensed:"2024-04-01", expires:"2026-04-01", hasBadge:false },
  { id:"LIC-L05", discord:"lcfeer",      name:"Muhammad mutaq",       rank:"LAWYER",        badge:"DOJ-LW-0005", status:"ACTIVE",    spec:"Criminal Defense",    cases:6,  winRate:50, points:75,  section:"",    citizenId:"ZAL02059", licensed:"2024-04-10", expires:"2026-04-10", hasBadge:true  },
  { id:"LIC-L06", discord:"rrb6",        name:"Valentino AlShammari", rank:"LAWYER",        badge:"DOJ-LW-0006", status:"ACTIVE",    spec:"Civil Litigation",    cases:9,  winRate:56, points:110, section:"",    citizenId:"MAV69959", licensed:"2024-05-01", expires:"2026-05-01", hasBadge:true  },
  { id:"LIC-T01", discord:"t10x",        name:"Silver Morgan",        rank:"TRAINEE",       badge:"DOJ-TR-0001", status:"PENDING",   spec:"General Practice",    cases:0,  winRate:0,  points:0,   section:"",    citizenId:"PFF33082", licensed:null,         expires:null,         hasBadge:true  },
  { id:"LIC-T02", discord:"ez.95",       name:"Victor Graves",        rank:"TRAINEE",       badge:"DOJ-TR-0002", status:"PENDING",   spec:"General Practice",    cases:0,  winRate:0,  points:0,   section:"",    citizenId:"DEE97656", licensed:null,         expires:null,         hasBadge:true  },
  { id:"LIC-T03", discord:"gilrx",       name:"Rod Saljoq",           rank:"TRAINEE",       badge:"DOJ-TR-0003", status:"PENDING",   spec:"General Practice",    cases:0,  winRate:0,  points:0,   section:"",    citizenId:"YRA78440", licensed:null,         expires:null,         hasBadge:false },
  { id:"LIC-X01", discord:"atty.cho",    name:"Edward Cho",           rank:"LAWYER",        badge:"DOJ-LW-0091", status:"SUSPENDED", spec:"Corporate Law",       cases:15, winRate:60, points:0,   section:"",    citizenId:"",         licensed:"2023-09-15", expires:"2025-09-15", hasBadge:false },
];

const JUDGE_DISCORD_MAP = {
  "abo3th":  "JDG-J01",
  "z.th":    "JDG-J02",
  "K3Q8":    "JDG-J03",
};

const getJudgeId = (user) => {
  if (!user) return null;
  const byDiscord = user.discordId ? JUDGE_DISCORD_MAP[user.discordId] : null;
  if (byDiscord) return byDiscord;
  const byUser = JUDGE_DISCORD_MAP[user.username];
  if (byUser) return byUser;
  return null;
};

const isJudgeRole = (role) =>
  ["GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"].includes(role);

const isSeniorJudge = (role) =>
  ["GENERAL_JUDGE","SENIOR_LEAD_JUDGE"].includes(role);

const judgeCanAccessCase = (judgeId, theCase, role) => {
  if (!judgeId || !theCase) return false;
  if (isSeniorJudge(role)) return true; // senior judges see all
  return theCase.judge === judgeId;
};

const JUDICIAL_AUDIT_LOG = [
  { id:"JAL-001", ts:"2025-02-01T09:00:00Z", judgeId:"JDG-J01", judge:"Hon. Marai AShamry", action:"ARRAIGNMENT_RECORDED",    caseId:"CASE-2025-0041", detail:"Arraignment completed. Defendant entered plea of not guilty.",           ip:"10.0.1.11", device:"Chrome/Windows", severity:"HIGH" },
  { id:"JAL-002", ts:"2025-06-20T10:30:00Z", judgeId:"JDG-J01", judge:"Hon. Marai AShamry", action:"TRIAL_COMMENCED",          caseId:"CASE-2025-0041", detail:"Trial formally commenced. Jury selection waived.",                     ip:"10.0.1.11", device:"Chrome/Windows", severity:"HIGH" },
  { id:"JAL-003", ts:"2025-07-04T14:15:00Z", judgeId:"JDG-J03", judge:"Hon. Yakyaki Saad",  action:"WARRANT_APPROVED",          caseId:"CASE-2025-0078", detail:"Search warrant WRT-2025-002 approved — Castellan Holdings.",           ip:"10.0.1.13", device:"Firefox/macOS",  severity:"HIGH" },
  { id:"JAL-004", ts:"2025-07-20T11:00:00Z", judgeId:"JDG-J03", judge:"Hon. Yakyaki Saad",  action:"WARRANT_APPROVED",          caseId:"CASE-2025-0078", detail:"Search warrant WRT-2025-003 approved — 44 Prestige Ave.",             ip:"10.0.1.13", device:"Firefox/macOS",  severity:"HIGH" },
  { id:"JAL-005", ts:"2025-08-01T09:45:00Z", judgeId:"JDG-J02", judge:"Hon. FAST RAGNR",    action:"BENCH_WARRANT_ISSUED",       caseId:"CASE-2025-0059", detail:"Bench warrant WRT-2025-004 issued — Whitmore failure to appear.",     ip:"10.0.1.12", device:"Chrome/Linux",   severity:"HIGH" },
  { id:"JAL-006", ts:"2024-08-01T16:00:00Z", judgeId:"JDG-J01", judge:"Hon. Marai AShamry", action:"VERDICT_RECORDED",           caseId:"CASE-2024-0019", detail:"Verdict recorded: NOT GUILTY. Case closed by judicial order.",        ip:"10.0.1.11", device:"Chrome/Windows", severity:"CRITICAL" },
  { id:"JAL-007", ts:"2024-08-05T09:10:00Z", judgeId:"JDG-J01", judge:"Hon. Marai AShamry", action:"CASE_LOCKED",                caseId:"CASE-2024-0019", detail:"Case locked post-verdict. Status transitioned to CLOSED.",            ip:"10.0.1.11", device:"Chrome/Windows", severity:"CRITICAL" },
];

const INIT_RULINGS = []; // Cleared 2026-03-05T20:00:00.000Z — 1 AI/demo entry removed by admin cleanup

const INIT_JUDICIAL_DOCS = [
  { id:"JDC-001", caseId:"CASE-2025-0041", judgeId:"JDG-J01", name:"Pre-Trial Order — Donovan",      type:"COURT_ORDER",   date:"2025-02-01", classification:"CONFIDENTIAL", hash:"sha256:jd9f2a...", size:"84 KB",  status:"SIGNED",   sigDate:"2025-02-01" },
  { id:"JDC-002", caseId:"CASE-2025-0078", judgeId:"JDG-J03", name:"Search Warrant Authorisation",   type:"WARRANT",       date:"2025-07-04", classification:"RESTRICTED",   hash:"sha256:w8c1e4...", size:"62 KB",  status:"SIGNED",   sigDate:"2025-07-04" },
  { id:"JDC-003", caseId:"CASE-2024-0019", judgeId:"JDG-J01", name:"Final Judgment — Haines",        type:"JUDGMENT",      date:"2024-08-01", classification:"RESTRICTED",   hash:"sha256:hj4d7f...", size:"121 KB", status:"SIGNED",   sigDate:"2024-08-01" },
];

const INIT_JUDICIAL_NOTES = [
  { id:"JNT-001", caseId:"CASE-2025-0041", judgeId:"JDG-J01", judge:"Hon. Marai AShamry", note:"Defendant exhibits signs of cooperation. Counsel interaction noted to be appropriate. Continue observation during proceedings.", ts:"2025-06-20T10:45:00Z", protected:true },
  { id:"JNT-002", caseId:"CASE-2025-0078", judgeId:"JDG-J03", judge:"Hon. Yakyaki Saad",  note:"Complex financial trail. Request forensic accounting report prior to trial date. Prosecution to provide by 30 days before hearing.", ts:"2025-07-10T14:30:00Z", protected:true },
];

const INIT_WARRANT_REQUESTS = [
  { id:"WRQ-001", type:"ARREST",  caseId:"CASE-2025-0041", subject:"Unnamed Co-defendant",    requestedBy:"_n2a",   requestedAt:"2026-02-15T08:00:00Z", grounds:"Eyewitness identification and forensic match.",  assignedJudge:"JDG-J01", status:"PENDING", urgency:"HIGH"   },
  { id:"WRQ-002", type:"SEARCH",  caseId:"CASE-2025-0102", subject:"Vehicle — License 7KQP",  requestedBy:"abo3th", requestedAt:"2026-02-20T11:30:00Z", grounds:"Suspected DUI equipment in vehicle.",            assignedJudge:"JDG-J02", status:"PENDING", urgency:"MEDIUM" },
  { id:"WRQ-003", type:"WIRETAP", caseId:"CASE-2025-0078", subject:"Castellan Holdings LLC",  requestedBy:"_n2a",   requestedAt:"2026-02-22T09:00:00Z", grounds:"Suspected ongoing criminal communications.",      assignedJudge:"JDG-J03", status:"PENDING", urgency:"HIGH"   },
];

const INIT_JUDGES = [
  { id:"JDG-J01", discord:"abo3th", name:"Hon. Marai AShamry",   court:"Urgent Court",   spec:"Urgent/Criminal",   presided:87,  points:2500, section:"U.C", citizenId:"",         appointed:"2024-01-10", status:"ACTIVE",  chamber:"Courtroom 1", rank:"JUDGE" },
  { id:"JDG-J02", discord:"z.th",   name:"Hon. FAST RAGNR",      court:"Urgent Court",   spec:"Urgent/Criminal",   presided:94,  points:2500, section:"U.C", citizenId:"JWJ82738", appointed:"2024-02-01", status:"ACTIVE",  chamber:"Courtroom 2", rank:"JUDGE" },
  { id:"JDG-J03", discord:"K3Q8",   name:"Hon. Yakyaki saad",    court:"Urgent Court",   spec:"Urgent/General",    presided:76,  points:2500, section:"U.C", citizenId:"APM19272", appointed:"2024-02-15", status:"ACTIVE",  chamber:"Courtroom 3", rank:"JUDGE" },
  { id:"JDG-V01", discord:"",        name:"[Vacant]",             court:"Supreme Court",  spec:"General",           presided:0,   points:0,    section:"",    citizenId:"",         appointed:null,         status:"VACANT",  chamber:"Courtroom 4", rank:"GENERAL_JUDGE" },
  { id:"JDG-V02", discord:"",        name:"[Vacant]",             court:"Supreme Court",  spec:"Constitutional",    presided:0,   points:0,    section:"",    citizenId:"",         appointed:null,         status:"VACANT",  chamber:"Courtroom 5", rank:"SENIOR_LEAD_JUDGE" },
  { id:"JDG-V03", discord:"",        name:"[Vacant]",             court:"District Court", spec:"Civil/Criminal",    presided:0,   points:0,    section:"",    citizenId:"",         appointed:null,         status:"VACANT",  chamber:"Courtroom 6", rank:"LEAD_JUDGE" },
];

const INIT_WARRANTS = []; // Cleared 2026-03-05T20:00:00.000Z — 4 AI/demo entries removed by admin cleanup

const INIT_EVIDENCE = []; // Cleared 2026-03-05T20:00:00.000Z — 4 AI/demo entries removed by admin cleanup

const INIT_INMATES = []; // Cleared 2026-03-05T20:00:00.000Z — 5 AI/demo entries removed by admin cleanup

const INIT_HEARINGS = []; // Cleared 2026-03-05T20:00:00.000Z — 5 AI/demo entries removed by admin cleanup

const CHANNELS = [
  { id:"CH-1", name:"general",   icon:"💬" },
  { id:"CH-2", name:"cases",     icon:"⚖️" },
  { id:"CH-3", name:"warrants",  icon:"🔍" },
  { id:"CH-4", name:"incidents", icon:"🚨" },
];

const INIT_MSGS = {
  "CH-1": [
    { id:"M1", user:"chief.harrison", content:"Good morning team. Castellan investigation update at 14:00.", time:"08:15", role:"DOJ_CHIEF" },
    { id:"M2", user:"atty.reeves",    content:"Confirmed. Evidence packets ready for review.", time:"08:22", role:"LAWYER" },
    { id:"M3", user:"dep.santos",     content:"Warrant extension filed with JDG-003.", time:"09:01", role:"DEPUTY_CHIEF" },
  ],
  "CH-2": [
    { id:"M4", user:"atty.reeves",  content:"CASE-2025-0041 next hearing April 10 — all parties notified.", time:"07:30", role:"LAWYER" },
    { id:"M5", user:"atty.walker",  content:"Whitmore estate docs filed. Awaiting judge acknowledgement.", time:"10:15", role:"LAWYER" },
  ],
  "CH-3": [{ id:"M6", user:"chief.harrison", content:"WRT-2025-003 approved. Execute within 48hrs.", time:"09:00", role:"DOJ_CHIEF" }],
  "CH-4": [],
};

const INIT_AUDIT_LOG = [
  { id:"AUD-CLN-SYS-001", ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_PURGE_COMPLETE", ref:"SYSTEM", detail:"Admin cleanup executed. All AI/demo data removed from platform. 29 entries cleared across 7 collections: INIT_CASES (5), INIT_EVIDENCE (4), INIT_WARRANTS (4), INIT_INMATES (5), INIT_HEARINGS (5), INIT_RULINGS (1), INIT_DOCUMENTS (5). All 23 verified Discord server members preserved. Zero real user accounts affected.", type:"system", severity:"CRITICAL", ip:"10.0.0.1" },
  { id:"AUD-CLN-CASE-001", ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"CASE-2025-0041", detail:"AI/demo case removed: CASE-2025-0041 (State v. Marcus L. Donovan). AI-generated placeholder. No real party affected.", type:"case", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-CASE-002", ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"CASE-2025-0059", detail:"AI/demo case removed: CASE-2025-0059 (In re: Estate of Whitmore). AI-generated placeholder.", type:"case", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-CASE-003", ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"CASE-2025-0078", detail:"AI/demo case removed: CASE-2025-0078 (Republic v. R. Castellan). AI-generated placeholder.", type:"case", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-CASE-004", ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"CASE-2024-0019", detail:"AI/demo case removed: CASE-2024-0019. AI-generated placeholder.", type:"case", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-CASE-005", ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"CASE-2025-0102", detail:"AI/demo case removed: CASE-2025-0102. AI-generated placeholder.", type:"case", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-EVD-001",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"EVD-001", detail:"AI/demo evidence removed: EVD-001 (CCTV Footage — 14 Jan 2025). AI-generated placeholder.", type:"evidence", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-EVD-002",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"EVD-002", detail:"AI/demo evidence removed: EVD-002 (Witness Statement — J. Park). AI-generated placeholder.", type:"evidence", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-EVD-003",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"EVD-003", detail:"AI/demo evidence removed: EVD-003 (Financial Records — Castellan). AI-generated placeholder.", type:"evidence", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-EVD-004",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"EVD-004", detail:"AI/demo evidence removed: EVD-004 (Intercepted Communications). AI-generated placeholder.", type:"evidence", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-WRT-001",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"WRT-2025-001", detail:"AI/demo warrant removed: WRT-2025-001 (Marcus L. Donovan — Arrest). AI-generated placeholder.", type:"warrant", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-WRT-002",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"WRT-2025-002", detail:"AI/demo warrant removed: WRT-2025-002 (Castellan Holdings — Search). AI-generated placeholder.", type:"warrant", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-WRT-003",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"WRT-2025-003", detail:"AI/demo warrant removed: WRT-2025-003. AI-generated placeholder.", type:"warrant", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-WRT-004",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"WRT-2025-004", detail:"AI/demo warrant removed: WRT-2025-004 (Frederick Whitmore). AI-generated placeholder.", type:"warrant", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-INM-001",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"INM-001", detail:"AI/demo inmate removed: INM-001 (Marcus L. Donovan). AI-generated placeholder.", type:"system", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-INM-002",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"INM-002", detail:"AI/demo inmate removed: INM-002 (Ramon Castellan). AI-generated placeholder.", type:"system", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-INM-003",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"INM-003", detail:"AI/demo inmate removed: INM-003 (Derek Holt). AI-generated placeholder.", type:"system", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-INM-004",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"INM-004", detail:"AI/demo inmate removed: INM-004 (Sofia Reyna). AI-generated placeholder.", type:"system", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-INM-005",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"INM-005", detail:"AI/demo inmate removed: INM-005 (Clarence Webb). AI-generated placeholder.", type:"system", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-HRG-001",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"HRG-001", detail:"AI/demo hearing removed: HRG-001 (Trial — State v. Donovan). AI-generated placeholder.", type:"system", severity:"MEDIUM", ip:"10.0.0.1" },
  { id:"AUD-CLN-HRG-002",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"HRG-002", detail:"AI/demo hearing removed: HRG-002 (Pre-Trial — Whitmore Estate). AI-generated placeholder.", type:"system", severity:"MEDIUM", ip:"10.0.0.1" },
  { id:"AUD-CLN-HRG-003",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"HRG-003", detail:"AI/demo hearing removed: HRG-003 (Bail Review — Donovan). AI-generated placeholder.", type:"system", severity:"MEDIUM", ip:"10.0.0.1" },
  { id:"AUD-CLN-HRG-004",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"HRG-004", detail:"AI/demo hearing removed: HRG-004 (Emergency Motion — Castellan). AI-generated placeholder.", type:"system", severity:"MEDIUM", ip:"10.0.0.1" },
  { id:"AUD-CLN-HRG-005",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"HRG-005", detail:"AI/demo hearing removed: HRG-005 (DUI Hearing — T. Nguyen). AI-generated placeholder.", type:"system", severity:"MEDIUM", ip:"10.0.0.1" },
  { id:"AUD-CLN-RUL-001",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"RUL-001", detail:"AI/demo ruling removed: RUL-001. AI-generated placeholder.", type:"system", severity:"HIGH", ip:"10.0.0.1" },
  { id:"AUD-CLN-DOC-001",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"DOC-001", detail:"AI/demo document removed: DOC-001 (Motion to Dismiss — Donovan). AI-generated placeholder.", type:"system", severity:"MEDIUM", ip:"10.0.0.1" },
  { id:"AUD-CLN-DOC-002",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"DOC-002", detail:"AI/demo document removed: DOC-002 (Estate Affidavit — Whitmore). AI-generated placeholder.", type:"system", severity:"MEDIUM", ip:"10.0.0.1" },
  { id:"AUD-CLN-DOC-003",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"DOC-003", detail:"AI/demo document removed: DOC-003 (Indictment — Castellan). AI-generated placeholder.", type:"system", severity:"MEDIUM", ip:"10.0.0.1" },
  { id:"AUD-CLN-DOC-004",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"DOC-004", detail:"AI/demo document removed: DOC-004 (Plea Agreement — Haines). AI-generated placeholder.", type:"system", severity:"MEDIUM", ip:"10.0.0.1" },
  { id:"AUD-CLN-DOC-005",  ts:"2026-03-05T20:00:00.000Z", actor:"admin (USR-000)", action:"AI_TEST_DATA_REMOVED", ref:"DOC-005", detail:"AI/demo document removed: DOC-005 (Search Warrant Affidavit). AI-generated placeholder.", type:"system", severity:"MEDIUM", ip:"10.0.0.1" },
];

const INIT_NOTIFS = [
  { id:"N1", title:"Warrant Issued",      body:"WRT-2025-003 approved by JDG-003.",      time:"09:00",    read:false, type:"warrant" },
  { id:"N2", title:"Case Status Updated", body:"CASE-2025-0041 moved to IN_COURT.",       time:"Yesterday",read:false, type:"case" },
  { id:"N3", title:"License Application", body:"Priya Nair submitted application.",        time:"2 days ago",read:true, type:"bar" },
  { id:"N4", title:"Hearing Scheduled",   body:"HRG-004 scheduled for April 22.",         time:"3 days ago",read:true, type:"calendar" },
];

const CRIMINAL_RECORDS = [
  { id:"CR-001", name:"Marcus L. Donovan", dob:"1988-03-22", ssn:"XXX-44-7812", offences:[{date:"2025-01-14",charge:"Armed Robbery",status:"PENDING",case:"CASE-2025-0041"},{date:"2021-06-10",charge:"Assault",status:"CONVICTED",case:"CASE-2021-0034"}], riskLevel:"HIGH" },
  { id:"CR-002", name:"Ramon Castellan",   dob:"1975-07-09", ssn:"XXX-62-3301", offences:[{date:"2025-06-18",charge:"Racketeering",status:"PENDING",case:"CASE-2025-0078"},{date:"2018-03-22",charge:"Fraud",status:"CONVICTED",case:"CASE-2018-0012"}], riskLevel:"CRITICAL" },
  { id:"CR-003", name:"Laura Haines",      dob:"1992-11-03", ssn:"XXX-55-9944", offences:[{date:"2024-04-10",charge:"Petty Theft",status:"ACQUITTED",case:"CASE-2024-0019"}], riskLevel:"LOW" },
];

const PLEA_DEALS = [
  { id:"PD-001", caseId:"CASE-2025-0041", defendant:"Marcus L. Donovan", originalCharge:"Armed Robbery (Class A)", proposedCharge:"Simple Assault (Class C)", sentence:"3 yrs probation", status:"PENDING",  offeredBy:"atty.reeves",  date:"2025-09-15" },
  { id:"PD-002", caseId:"CASE-2024-0019", defendant:"Laura Haines",      originalCharge:"Theft (Class B)",         proposedCharge:"Misdemeanor Theft",       sentence:"Community service", status:"ACCEPTED", offeredBy:"dep.santos",   date:"2024-07-01" },
  { id:"PD-003", caseId:"CASE-2025-0102", defendant:"Tran Nguyen",        originalCharge:"DUI + Traffic (3 counts)",proposedCharge:"Single DUI",              sentence:"Fine + 6mo license suspension", status:"REJECTED", offeredBy:"atty.walker", date:"2025-10-01" },
];

const ANALYTICS_DATA = {
  monthlyCases: [
    { month:"Jul", cases:12, warrants:3, closed:8 },
    { month:"Aug", cases:18, warrants:5, closed:11 },
    { month:"Sep", cases:14, warrants:4, closed:9 },
    { month:"Oct", cases:22, warrants:7, closed:16 },
    { month:"Nov", cases:19, warrants:6, closed:14 },
    { month:"Dec", cases:25, warrants:8, closed:20 },
    { month:"Jan", cases:17, warrants:5, closed:12 },
    { month:"Feb", cases:21, warrants:7, closed:17 },
    { month:"Mar", cases:28, warrants:9, closed:22 },
  ],
  caseTypes: [
    { name:"Criminal", value:45, color:"#e07a6e" },
    { name:"Civil",    value:30, color:"#5aabec" },
    { name:"Traffic",  value:25, color:"#f0c842" },
  ],
  resolutions: [
    { month:"Q1", guilty:12, notGuilty:8, dismissed:3, settled:5 },
    { month:"Q2", guilty:15, notGuilty:10, dismissed:4, settled:7 },
    { month:"Q3", guilty:18, notGuilty:12, dismissed:5, settled:9 },
    { month:"Q4", guilty:22, notGuilty:14, dismissed:6, settled:11 },
  ],
};

const statusBadge = s => {
  const m = { OPEN:"teal", IN_COURT:"blue", UNDER_INVESTIGATION:"yellow", CLOSED:"gray", ACTIVE:"green", EXECUTED:"gray", EXPIRED:"red", REMAND:"yellow", SENTENCED:"red", RELEASED:"gray", PENDING:"yellow", APPROVED:"green", REJECTED:"red", SUSPENDED:"red", ACCEPTED:"green", COMPLETED:"green", SCHEDULED:"teal" };
  return <span className={`badge bg-${m[s]||"gray"}`}>{s?.replace(/_/g," ")}</span>;
};
const priorityBadge = p => {
  const m = { CRITICAL:"red", HIGH:"gold", MEDIUM:"yellow", LOW:"gray" };
  return <span className={`badge bg-${m[p]||"gray"}`}>{p}</span>;
};
const riskBadge = r => (
  <span className={`badge risk-${r||"LOW"}`}>{r}</span>
);

const NAV_ITEMS = [
  { section:"CORE OPERATIONS" },
  { key:"dashboard",    label:"Dashboard",           icon:"home",       perm:"DASHBOARD_VIEW" },
  { key:"cases",        label:"Cases",               icon:"briefcase",  perm:"CASE_VIEW",        minLevel:2 },
  { key:"documents",    label:"Documents",           icon:"file",       perm:"DOC_VIEW",         minLevel:2 },
  { key:"evidence",     label:"Evidence",            icon:"fingerprint",perm:"EVIDENCE_VIEW",    minLevel:2 },
  { section:"COURT MANAGEMENT" },
  { key:"courts",       label:"Courts Section",      icon:"hammer",     badge:"NEW",             minLevel:2 },
  { key:"calendar",     label:"Court Schedule",      icon:"calendar",                            minLevel:2 },
  { key:"jury",         label:"Jury Selection",      icon:"users",                               minLevel:2 },
  { key:"judgesection", label:"Judicial Workspace",  icon:"hammer",     badge:"⚖",              minLevel:6 },
  { key:"precedents",   label:"Legal Precedents",    icon:"book",                                minLevel:2 },
  { section:"RECORDS & PROFILES" },
  { key:"criminal",     label:"Criminal Records",    icon:"fingerprint",perm:"CRIMINAL_VIEW",    minLevel:2 },
  { key:"citizens",     label:"Citizen Profiles",    icon:"user",       perm:"CITIZEN_VIEW",     minLevel:2 },
  { key:"casefolders",  label:"Case Folders",        icon:"clipboard",  perm:"CASE_FOLDER_VIEW", minLevel:2 },
  { key:"legaldocs",    label:"Legal Documents",     icon:"file",       perm:"LEGAL_DOC_VIEW",   minLevel:2 },
  { key:"pleadeals",    label:"Plea Deals",          icon:"scale",      perm:"PLEA_VIEW",        minLevel:2 },
  { section:"WARRANT SYSTEMS" },
  { key:"warrants",     label:"Warrant System",      icon:"shield",     perm:"WARRANT_VIEW",     minLevel:2 },
  { key:"bench",        label:"Bench Warrants",      icon:"hammer",                              minLevel:2 },
  { section:"OPERATIONS" },
  { key:"roster",       label:"Staff Roster",        icon:"users",      badge:"MGT",             minLevel:4 },
  { key:"points",       label:"Points & Fines",      icon:"star",       badge:"NEW",             minLevel:4 },
  { key:"inmates",      label:"Detention Registry",  icon:"lock",                                minLevel:2 },
  { key:"analytics",    label:"Analytics",           icon:"chart",                               minLevel:2 },
  { key:"chat",         label:"Internal Comms",      icon:"chat",                                minLevel:2 },
  { key:"bar",          label:"Bar Association",     icon:"star",       perm:"BAR_VIEW",         minLevel:2 },
  { key:"leaderboard",  label:"Leaderboard",         icon:"star",       badge:"TOP",             minLevel:2 },
  { key:"bausermgmt",   label:"BA User Mgmt",        icon:"users",      badge:"BA",              minLevel:6 },
  { section:"SYSTEM" },
  { key:"auditreport",  label:"Audit & Security",    icon:"shield",     badge:"LIVE",            minLevel:7 },
  { key:"admin",        label:"Admin Panel",         icon:"settings",                            minLevel:8 },
  { key:"profile",      label:"My Profile",          icon:"user" },
  { key:"public",       label:"Public Lookup",       icon:"globe" },
];

const AccessDeniedPage = ({ user, page = "this section", setAuditLog }) => {
  useEffect(() => {
    if (!user || !setAuditLog) return;
    setAuditLog(prev => [{
      id: "AUD-AD-" + Date.now(),
      ts: new Date().toISOString(),
      actor: user.username || "UNKNOWN",
      action: "ACCESS_DENIED",
      ref: page,
      detail: `Access denied: ${user.username} (role: ${user.role || "NONE"}) attempted to access "${page}". Required: DOJ personnel role (TRAINEE or above). Server enforcement: 1227422529656983582. Not a DOJ role — all privileges blocked.`,
      type: "auth",
      severity: "HIGH",
      ip: "10.0.1." + Math.floor(Math.random() * 200 + 10),
    }, ...prev.slice(0, 499)]);
  }, [page]);

  const ts = new Date().toISOString().slice(0,19) + "Z";
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",gap:18,padding:40}}>
      <div style={{fontSize:60,filter:"grayscale(1)",opacity:.7}}>🔒</div>
      <div style={{fontWeight:800,fontSize:22,color:"var(--teal-l)",letterSpacing:"2px",textTransform:"uppercase"}}>Access Restricted</div>
      <div style={{color:"var(--mid)",fontSize:13,textAlign:"center",maxWidth:460,lineHeight:1.9}}>
        <strong style={{color:"var(--gold-l)"}}>{page}</strong> is restricted to verified Department of Justice personnel only.<br/>
        Your current role (<strong style={{color:"var(--dim)"}}>{ROLES[user?.role]?.label||user?.role||"Unknown"}</strong>)
        does not have the required permissions. This access attempt has been logged.
      </div>
      <div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap",justifyContent:"center"}}>
        <div style={{fontSize:11,padding:"4px 14px",borderRadius:3,background:"rgba(26,122,122,.1)",border:"1px solid rgba(26,122,122,.25)",color:"var(--teal-l)",fontFamily:"'IBM Plex Mono',monospace"}}>
          REQUIRED: DOJ PERSONNEL ROLE (TRAINEE+)
        </div>
        <div style={{fontSize:11,padding:"4px 14px",borderRadius:3,background:"rgba(224,122,110,.1)",border:"1px solid rgba(224,122,110,.3)",color:"var(--red)",fontFamily:"'IBM Plex Mono',monospace"}}>
          ACCESS_DENIED — LOGGED
        </div>
      </div>
      <div style={{fontSize:10,color:"var(--dim)",marginTop:8,fontFamily:"'IBM Plex Mono',monospace",letterSpacing:".5px",textAlign:"center"}}>
        ERR_ACCESS_DENIED · ROLE:{user?.role||"NONE"} · {ts} · SERVER:1227422529656983582
      </div>
    </div>
  );
};

const Sidebar = ({ page, setPage, collapsed, setCollapsed, user, onLogout }) => (
  <div className={`sidebar${collapsed ? " collapsed" : ""}`}>
    {}
    <div style={{ padding:"14px 10px 10px", borderBottom:"1px solid var(--b1)", display:"flex", alignItems:"center", gap:"10px", cursor:"pointer" }} onClick={() => setCollapsed(c => !c)}>
      <img src={SEAL_B64} alt="DOJ" style={{ width:28, height:28, objectFit:"contain", flexShrink:0, filter:"drop-shadow(0 0 6px rgba(26,122,122,.4))" }} />
      <div className="sidebar-logo-text">
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"12px", color:"var(--teal-l)", letterSpacing:"1px", lineHeight:1.2 }}>OUTLAW DOJ</div>
        <div style={{ fontSize:"9px", color:"var(--dim)", letterSpacing:"1.5px" }}>SECURE PORTAL</div>
      </div>
    </div>
    {}
    <div style={{ flex:1, padding:"8px 6px", overflowY:"auto" }}>
      {NAV_ITEMS.map((item, idx) => {
        if (item.section) return <div key={idx} className="sec-label">{item.section}</div>;
        if (item.minLevel && (ROLES[user?.role]?.level||0) < item.minLevel) return null;
        if (item.perm && !hasPerm(user?.role, item.perm)) return null;
        const active = page === item.key;
        return (
          <div key={item.key} className={`sl${active ? " active" : ""}`} onClick={() => setPage(item.key)} title={collapsed ? item.label : ""}>
            <Ico n={item.icon} s={15} c={active ? "var(--teal-l)" : "currentColor"} />
            <span style={{ flex:1 }}>{item.label}</span>
            {item.badge && !collapsed && <span style={{ fontSize:"8px", background:"var(--red)", color:"#fff", padding:"1px 4px", borderRadius:"2px", fontFamily:"'IBM Plex Mono',monospace" }}>{item.badge}</span>}
          </div>
        );
      })}
    </div>
    {}
    <div style={{ padding:"8px 6px", borderTop:"1px solid var(--b1)" }}>
      {}
      {user?.discordVerified && !collapsed && (
        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 10px", marginBottom:4, background:"rgba(88,101,242,.08)", borderRadius:"var(--radius)", border:"1px solid rgba(88,101,242,.2)" }}>
          <svg width="12" height="12" viewBox="0 0 71 55" fill="#7289da"><path d="M60.1 4.9A58.5 58.5 0 0045.7.44a.22.22 0 00-.23.11 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.23 0 37.4 37.4 0 00-1.83-3.7.23.23 0 00-.23-.11A58.2 58.2 0 0010.9 4.9a.21.21 0 00-.1.08C1.6 18.1-.96 30.9.3 43.6a.24.24 0 00.09.16 58.8 58.8 0 0017.7 8.95.23.23 0 00.25-.08 42 42 0 003.6-5.88.23.23 0 00-.12-.32 38.7 38.7 0 01-5.53-2.64.23.23 0 01-.02-.38 30.4 30.4 0 001.1-.86.22.22 0 01.23-.03c11.6 5.3 24.14 5.3 35.6 0a.22.22 0 01.23.03c.37.3.73.58 1.1.86a.23.23 0 01-.02.38 36.4 36.4 0 01-5.54 2.63.23.23 0 00-.12.33 47.1 47.1 0 003.6 5.87.23.23 0 00.25.08 58.6 58.6 0 0017.73-8.95.23.23 0 00.09-.16c1.47-15.2-2.47-28-10.47-39.54a.18.18 0 00-.09-.09z"/></svg>
          <span style={{ fontSize:9, color:"#7289da", fontWeight:600 }}>Discord Session Active</span>
        </div>
      )}
      <div onClick={onLogout}
        style={{ display:"flex", alignItems:"center", gap:"9px", padding:"7px 10px", borderRadius:"var(--radius)", color:"var(--dim)", fontSize:"12.5px", cursor:"pointer", transition:"all .15s" }}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(224,122,110,.1)"}
        onMouseLeave={e=>e.currentTarget.style.background="transparent"}
        title={collapsed ? "Sign Out — revokes session" : ""}>
        <Ico n="logout" s={15} />
        {!collapsed && <span>Sign Out</span>}
      </div>
    </div>
  </div>
);

const TopBar = ({ user, dark, setDark, notifs, setNotifs, onSearch }) => {
  const [showNotif, setShowNotif] = useState(false);
  const unread = notifs.filter(n => !n.read).length;
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <div className="topbar">
      {}
      <div style={{ display:"flex", alignItems:"center", gap:"10px", flexShrink:0 }}>
        <span className="pf" style={{ fontSize:"13px", color:"var(--teal-l)", letterSpacing:"1px" }}>DOJ PORTAL</span>
        <span style={{ color:"var(--b2)" }}>|</span>
        <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
          <div className="dot dot-green dot-pulse" />
          <span style={{ fontSize:"11px", color:"var(--dim)" }}>All Systems Operational</span>
        </div>
      </div>
      {}
      <div style={{ flex:1, maxWidth:320, marginLeft:"auto" }}>
        <div style={{ position:"relative" }}>
          <input className="inp" placeholder="⌘K  Search records, cases, warrants…" style={{ paddingLeft:12, fontSize:12 }} onFocus={onSearch} readOnly />
        </div>
      </div>
      {}
      <div style={{ display:"flex", alignItems:"center", gap:"12px", flexShrink:0 }}>
        <span className="mo" style={{ fontSize:"11px", color:"var(--dim)" }}>{time.toLocaleTimeString()}</span>
        {}
        <button className="btn btn-outline btn-xs" onClick={() => setDark(d => !d)} title="Toggle theme">
          <Ico n={dark ? "sun" : "moon"} s={13} />
        </button>
        {}
        <div style={{ position:"relative" }}>
          <button className="btn btn-outline btn-xs" onClick={() => setShowNotif(s => !s)} style={{ position:"relative" }}>
            <Ico n="bell" s={13} />
            {unread > 0 && <span className="ndot" />}
          </button>
          {showNotif && (
            <div className="notif-panel">
              <div style={{ padding:"10px 13px", borderBottom:"1px solid var(--b1)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:"12px", fontWeight:600 }}>Notifications</span>
                <button className="btn btn-xs btn-outline" onClick={() => setNotifs(n => n.map(x => ({ ...x, read:true })))}>Mark all read</button>
              </div>
              {notifs.map(n => (
                <div key={n.id} className={`notif-item${n.read ? "" : " unread"}`} onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read:true } : x))}>
                  <div style={{ fontSize:"12px", fontWeight:n.read ? 400 : 600 }}>{n.title}</div>
                  <div style={{ fontSize:"11px", color:"var(--mid)", marginTop:"2px" }}>{n.body}</div>
                  <div style={{ fontSize:"10px", color:"var(--dim)", marginTop:"2px" }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {}
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <div className="av" style={{ width:28, height:28, fontSize:11 }}>{user.username.slice(0,2).toUpperCase()}</div>
          <div>
            <div style={{ fontSize:"12px", fontWeight:600 }}>{user.username}</div>
            <span className={`badge bg-${ROLES[user.role]?.color || "gray"}`} style={{ fontSize:"9px" }}>{ROLES[user.role]?.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const GlobalSearch = ({ open, onClose, setPage }) => {
  const [q, setQ] = useState("");
  const ref = useRef();
  useEffect(() => { if (open) { setQ(""); setTimeout(() => ref.current?.focus(), 50); } }, [open]);
  if (!open) return null;

  const results = [];
  if (q.length > 1) {
    INIT_CASES.filter(c => c.title.toLowerCase().includes(q.toLowerCase()) || c.id.toLowerCase().includes(q.toLowerCase())).forEach(c => results.push({ type:"Case", label:c.title, sub:c.id, page:"cases", icon:"briefcase" }));
    INIT_LAWYERS.filter(l => l.name.toLowerCase().includes(q.toLowerCase())).forEach(l => results.push({ type:"Lawyer", label:l.name, sub:l.badge, page:"bar", icon:"user" }));
    INIT_WARRANTS.filter(w => w.subject.toLowerCase().includes(q.toLowerCase()) || w.id.toLowerCase().includes(q.toLowerCase())).forEach(w => results.push({ type:"Warrant", label:w.subject, sub:w.id, page:"warrants", icon:"shield" }));
    INIT_INMATES.filter(i => i.name.toLowerCase().includes(q.toLowerCase())).forEach(i => results.push({ type:"Inmate", label:i.name, sub:i.id, page:"inmates", icon:"lock" }));
  }

  return (
    <div className="gs-ov" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="gs-box">
        <div style={{ display:"flex", alignItems:"center", borderBottom:"1px solid var(--b1)" }}>
          <Ico n="search" s={16} c="var(--dim)" style={{ margin:"0 12px" }} />
          <input ref={ref} className="gs-inp" value={q} onChange={e => setQ(e.target.value)} placeholder="Search cases, warrants, inmates, lawyers…" onKeyDown={e => e.key === "Escape" && onClose()} />
          <span style={{ padding:"0 12px", fontSize:"11px", color:"var(--dim)", cursor:"pointer" }} onClick={onClose}>ESC</span>
        </div>
        {results.length > 0 && results.slice(0,8).map((r, i) => (
          <div key={i} className="gs-res" onClick={() => { setPage(r.page); onClose(); }}>
            <div style={{ width:28, height:28, background:"rgba(26,122,122,.15)", borderRadius:"3px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Ico n={r.icon} s={13} c="var(--teal-l)" />
            </div>
            <div>
              <div style={{ fontSize:"13px" }}>{r.label}</div>
              <div style={{ fontSize:"11px", color:"var(--dim)" }}><span className="badge bg-teal" style={{ fontSize:"9px" }}>{r.type}</span> {r.sub}</div>
            </div>
          </div>
        ))}
        {q.length > 1 && results.length === 0 && (
          <div style={{ padding:"18px", textAlign:"center", color:"var(--dim)", fontSize:"13px" }}>No results found for "{q}"</div>
        )}
        {q.length <= 1 && (
          <div style={{ padding:"14px 16px" }}>
            <div style={{ fontSize:"11px", color:"var(--dim)", marginBottom:"8px", textTransform:"uppercase", letterSpacing:"1px" }}>Quick navigation</div>
            {[["cases","Cases","briefcase"],["warrants","Warrants","shield"],["inmates","Detention","lock"],["analytics","Analytics","chart"]].map(([p,l,ico]) => (
              <div key={p} className="gs-res" onClick={() => { setPage(p); onClose(); }}>
                <Ico n={ico} s={13} c="var(--mid)" />
                <span style={{ fontSize:"13px", color:"var(--mid)" }}>{l}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ user, cases, evidence, warrants, feed, setPage }) => {
  const activeCases = cases.filter(c => c.status !== "CLOSED").length;
  const closedCases = cases.filter(c => c.status === "CLOSED").length;
  const inCourt = cases.filter(c => c.status === "IN_COURT").length;

  return (
    <div className="fade">
      {}
      <div className="sys-banner">
        <div className="dot dot-green dot-pulse" />
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"12px", color:"var(--teal-l)", letterSpacing:"1px" }}>
          DOJ SYSTEM STATUS: ALL SYSTEMS OPERATIONAL
        </span>
        <span style={{ fontSize:"11px", color:"var(--dim)" }}>· Total Cases Managed: {cases.length} · Uptime: 99.97%</span>
      </div>

      {}
      <div className="g4" style={{ marginBottom:18 }}>
        {[
          { label:"Active Cases",      value:activeCases, color:"teal",  icon:"briefcase", trend:"+3 this month" },
          { label:"Pending Documents", value:14,          color:"gold",  icon:"file",       trend:"⚠ 3 overdue" },
          { label:"Court Hearings",    value:INIT_HEARINGS.filter(h=>h.status==="SCHEDULED").length, color:"",icon:"calendar",trend:"Next: Apr 10" },
          { label:"Closed Cases",      value:closedCases, color:"green", icon:"check",      trend:"82% resolution" },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <div className={`stat-v ${s.color}`}>{s.value}</div>
                <div className="stat-l">{s.label}</div>
              </div>
              <div style={{ opacity:.25, marginTop:2 }}><Ico n={s.icon} s={22} /></div>
            </div>
            <div style={{ marginTop:10, fontSize:"11px", color:"var(--dim)" }}>{s.trend}</div>
          </div>
        ))}
      </div>

      {}
      <div className="g2" style={{ marginBottom:18, gap:16 }}>
        {}
        <div className="card">
          <div className="card-header">
            <span className="pf" style={{ fontSize:"14px" }}>Activity Trends</span>
            <span className="badge bg-teal">Monthly</span>
          </div>
          <div className="card-body" style={{ height:200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA.monthlyCases} margin={{ top:5, right:10, left:-20, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--b1)" />
                <XAxis dataKey="month" tick={{ fontSize:10, fill:"var(--dim)" }} />
                <YAxis tick={{ fontSize:10, fill:"var(--dim)" }} />
                <Tooltip contentStyle={{ background:"var(--panel)", border:"1px solid var(--b2)", borderRadius:"3px", fontSize:"12px" }} />
                <Area type="monotone" dataKey="cases" stroke="var(--teal-l)" fill="rgba(26,122,122,.15)" strokeWidth={2} name="Cases" />
                <Area type="monotone" dataKey="warrants" stroke="var(--gold-l)" fill="rgba(201,168,76,.1)" strokeWidth={2} name="Warrants" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {}
        <div className="card">
          <div className="card-header">
            <span className="pf" style={{ fontSize:"14px" }}>Case Distribution</span>
          </div>
          <div className="card-body" style={{ height:200, display:"flex", alignItems:"center" }}>
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={ANALYTICS_DATA.caseTypes} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {ANALYTICS_DATA.caseTypes.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background:"var(--panel)", border:"1px solid var(--b2)", borderRadius:"3px", fontSize:"12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex:1 }}>
              {ANALYTICS_DATA.caseTypes.map(t => (
                <div key={t.name} style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                  <div style={{ width:10, height:10, borderRadius:"2px", background:t.color, flexShrink:0 }} />
                  <span style={{ fontSize:"12px", color:"var(--mid)", flex:1 }}>{t.name}</span>
                  <span className="mo" style={{ fontSize:"12px" }}>{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="g2" style={{ gap:16 }}>
        {}
        <div className="card">
          <div className="card-header"><span className="pf" style={{ fontSize:"14px" }}>System Health</span></div>
          <div className="card-body">
            {[
              { label:"Database Server",     ok:true,  detail:"PostgreSQL · 23ms" },
              { label:"Web Application",     ok:true,  detail:"Node.js · 99.97% uptime" },
              { label:"Authentication",      ok:true,  detail:"JWT + Discord OAuth" },
              { label:"Backup System",       ok:true,  detail:"Last backup: 02:00 UTC" },
              { label:"System Uptime",       ok:true,  detail:"47 days, 14h" },
              { label:"Active Sessions",     ok:true,  detail:"12 users online" },
            ].map(s => (
              <div key={s.label} className="health-row">
                <span style={{ fontSize:"12.5px" }}>{s.label}</span>
                <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                  <span style={{ fontSize:"11px", color:"var(--dim)" }}>{s.detail}</span>
                  <div className={`dot dot-${s.ok ? "green" : "red"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {}
        <div className="card">
          <div className="card-header"><span className="pf" style={{ fontSize:"14px" }}>DOJ Operations Status</span></div>
          <div className="card-body">
            {[
              { label:"Active Cases",       value:activeCases,          color:"var(--teal-l)" },
              { label:"Scheduled Hearings", value:INIT_HEARINGS.filter(h=>h.status==="SCHEDULED").length, color:"#5aabec" },
              { label:"Pending Documents",  value:14,                   color:"var(--gold-l)" },
              { label:"Closed Cases",       value:closedCases,          color:"#4cd98a" },
              { label:"Active Users",       value:12,                   color:"var(--mid)" },
              { label:"System Load",        value:"18%",                color:"#4cd98a" },
            ].map(s => (
              <div key={s.label} className="health-row">
                <span style={{ fontSize:"12.5px" }}>{s.label}</span>
                <span className="mo" style={{ fontSize:"13px", color:s.color }}>{s.value}</span>
              </div>
            ))}
            <div style={{ marginTop:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:"11px", color:"var(--dim)", marginBottom:4 }}>
                <span>System Load</span><span>18%</span>
              </div>
              <div className="pbar"><div className="pbar-fill" style={{ width:"18%", background:"var(--green-l)" }} /></div>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="card" style={{ marginTop:16 }}>
        <div className="card-header">
          <span className="pf" style={{ fontSize:"14px" }}>Recent Cases</span>
          <button className="btn btn-outline btn-sm" onClick={() => setPage("cases")}><Ico n="briefcase" s={13} />View All</button>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table className="tbl">
            <thead><tr><th>Case ID</th><th>Title</th><th>Type</th><th>Status</th><th>Priority</th><th>Filed</th></tr></thead>
            <tbody>
              {cases.slice(0,4).map(c => (
                <tr key={c.id}>
                  <td className="mo txs tdim">{c.id}</td>
                  <td style={{ fontWeight:500, maxWidth:200 }}>{c.title}</td>
                  <td><span className="tag">{c.type}</span></td>
                  <td>{statusBadge(c.status)}</td>
                  <td>{priorityBadge(c.priority)}</td>
                  <td className="tsm tmid">{c.filed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {}
      <div style={{ marginTop:16 }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, marginBottom:3 }}>Live Activity Feed</div>
        <div style={{ fontSize:11, color:"var(--dim)", marginBottom:12 }}>Real-time log — cases, evidence, warrants added to the system</div>
        <div style={{ height:2, background:"linear-gradient(90deg,var(--teal),transparent)", marginBottom:14 }}/>
        <div className="g2" style={{ gap:14 }}>
          {}
          <div className="card" style={{ height:380, display:"flex", flexDirection:"column" }}>
            <div className="card-header" style={{ flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div className="dot dot-teal dot-pulse"/>
                <span style={{ fontWeight:600, fontSize:13 }}>Activity Stream</span>
              </div>
              <span className="badge bg-teal">{(feed||[]).length} events</span>
            </div>
            <div style={{ overflowY:"auto", flex:1 }}>
              {(feed||[]).map((f,i) => {
                const ic = f.type==="case"?"briefcase":f.type==="evidence"?"fingerprint":"shield";
                const bc = f.type==="case"?"teal":f.type==="evidence"?"blue":"gold";
                return (
                  <div key={f.id} style={{ padding:"10px 14px", borderBottom:"1px solid var(--b1)", display:"flex", gap:10, alignItems:"flex-start", background:i===0?"rgba(26,122,122,.04)":"transparent", transition:"background .3s" }}>
                    <div style={{ width:30, height:30, borderRadius:"var(--radius)", background:`rgba(26,122,122,.12)`, border:"1px solid rgba(26,122,122,.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                      <Ico n={ic} s={13} c="var(--teal-l)"/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                        <span className={`badge bg-${bc}`} style={{ fontSize:"9px" }}>{f.type.toUpperCase()}</span>
                        <span style={{ fontWeight:600, fontSize:12 }}>{f.label}</span>
                        {i===0 && <span style={{ fontSize:"9px", background:"var(--teal-d)", color:"var(--teal-l)", padding:"1px 5px", borderRadius:2, fontFamily:"'IBM Plex Mono',monospace" }}>NEW</span>}
                      </div>
                      <div style={{ fontSize:12, color:"var(--mid)", marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.detail}</div>
                      <div style={{ fontSize:10, color:"var(--dim)", display:"flex", gap:10 }}>
                        <span className="mo">{f.ref}</span>
                        <span>·</span>
                        <span>{f.user}</span>
                        <span>·</span>
                        <span>{f.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {(!feed||feed.length===0) && <div style={{ padding:24, textAlign:"center", color:"var(--dim)", fontSize:13 }}>No activity recorded yet.</div>}
            </div>
          </div>
          {}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div className="card">
              <div className="card-header"><span style={{ fontWeight:600, fontSize:13 }}>Evidence Vault</span><button className="btn btn-outline btn-xs" onClick={()=>setPage("evidence")}>View All</button></div>
              <div className="card-body" style={{ padding:"10px 14px" }}>
                {(evidence||[]).slice(0,4).map(e=>(
                  <div key={e.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:"1px solid var(--b1)" }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600 }}>{e.title}</div>
                      <div style={{ fontSize:10, color:"var(--dim)" }}><span className="mo">{e.id}</span> · {e.type}</div>
                    </div>
                    {statusBadge(e.status)}
                  </div>
                ))}
                {(evidence||[]).length > 4 && <div style={{ fontSize:11, color:"var(--dim)", textAlign:"center", marginTop:8 }}>+{evidence.length-4} more items in vault</div>}
              </div>
            </div>
            <div className="card">
              <div className="card-header"><span style={{ fontWeight:600, fontSize:13 }}>Active Warrants</span><button className="btn btn-outline btn-xs" onClick={()=>setPage("warrants")}>View All</button></div>
              <div className="card-body" style={{ padding:"10px 14px" }}>
                {(warrants||[]).filter(w=>w.status==="ACTIVE").slice(0,3).map(w=>(
                  <div key={w.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:"1px solid var(--b1)" }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600 }}>{w.subject}</div>
                      <div style={{ fontSize:10, color:"var(--dim)" }}><span className="mo">{w.id}</span> · {w.type}</div>
                    </div>
                    <span className="badge bg-red">{w.type}</span>
                  </div>
                ))}
                {(warrants||[]).filter(w=>w.status==="ACTIVE").length===0 && <div style={{ fontSize:12, color:"var(--dim)", textAlign:"center", padding:12 }}>No active warrants</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CasesPage = ({ user, cases, setCases, evidence: sharedEvidence, setEvidence: setSharedEvidence, warrants: sharedWarrants, setWarrants: setSharedWarrants, onAdd, onAddEvidence, onAddWarrant, setAuditLog }) => {
  if (!hasPerm(user?.role, "CASE_VIEW")) return (<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:320,gap:16}}>
    <div style={{fontSize:48}}>🔒</div>
    <div style={{fontWeight:700,fontSize:18,color:"var(--teal-l)",letterSpacing:"1px"}}>ACCESS RESTRICTED</div>
    <div style={{color:"var(--dim)",fontSize:13,textAlign:"center",maxWidth:380,lineHeight:1.7}}>
      This section is restricted to verified Department of Justice personnel only.<br/>
      Your current role (<strong style={{color:"var(--gold-l)"}}>{ROLES[user?.role]?.label||user?.role}</strong>) does not have the required permissions.
    </div>
    <div style={{fontSize:11,color:"var(--dim)",background:"var(--surf)",border:"1px solid var(--b1)",padding:"8px 16px",borderRadius:"var(--radius)",fontFamily:"'IBM Plex Mono',monospace"}}>
      ERR_ACCESS_DENIED · {user?.role||"UNAUTHENTICATED"} · {new Date().toISOString().slice(0,19)}Z
    </div>
  </div>);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("details");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    title:"", type:"Criminal", plaintiff:"", defendant:"",
    priority:"MEDIUM", desc:"", lawyer:"", judge:"",
    hearing:"", notes:"", charges:"", location:"",
    compensation_eligible:false, legalAidReason:"",
    relatedCaseId:"", courtroom:"Courtroom 1",
  });
  const canCreate   = hasPerm(user.role, "CASE_CREATE");
  const canEdit     = hasPerm(user.role, "CASE_EDIT") || hasPerm(user.role, "CASE_CREATE");
  const canClose    = hasPerm(user.role, "CASE_CLOSE");
  const canDelete   = hasPerm(user.role, "CASE_DELETE");
  const canManage   = canCreate; // alias kept for existing UI references
  const isJudicialField = (f) => ["verdict","sentence","ruling","judicialNotes","courtOrder"].includes(f);
  const caseFieldGuard  = (c, field) => {
    if (!c) return true;
    if (c.status === "IN_COURT" && isJudicialField(field)) {
      const jId = getJudgeId ? getJudgeId(user) : null;
      return (jId && c.judge === jId) || ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"].includes(user.role);
    }
    return canEdit;
  };

  const [lookupId, setLookupId] = useState("");
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState("");
  const [showAddEvidence, setShowAddEvidence] = useState(false);
  const [showAddWarrant, setShowAddWarrant] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddHearing, setShowAddHearing] = useState(false);
  const [evForm, setEvForm] = useState({ title:"", type:"DOCUMENT", notes:"" });
  const [wrtForm, setWrtForm] = useState({ type:"ARREST", subject:"", grounds:"" });
  const [noteText, setNoteText] = useState("");
  const [hrForm, setHrForm] = useState({ title:"", date:"", time:"09:00", room:"Courtroom 1", judge:"JDG-001", type:"TRIAL" });
  const [localEvidence, setLocalEvidence] = useState([]);
  const [localWarrants, setLocalWarrants] = useState([]);
  const allEvidence = sharedEvidence || localEvidence;
  const allWarrants = sharedWarrants || localWarrants;

  const doLookup = () => {
    const q = lookupId.trim().toUpperCase();
    if (!q) return;
    const found = cases.find(c => c.id.toUpperCase() === q || c.id.toUpperCase().includes(q));
    if (found) { setLookupResult(found); setLookupError(""); setSelected(found); setTab("details"); }
    else { setLookupResult(null); setLookupError(`No case found for "${lookupId}"`); }
  };

  const addEvidenceToCase = () => {
    if (!evForm.title || !lookupResult) return;
    const ne = {
      id:"EVD-"+String(allEvidence.length+1).padStart(3,"0"),
      caseId:lookupResult.id, title:evForm.title, type:evForm.type,
      status:"UNDER_REVIEW", by:user.username,
      date:new Date().toISOString().slice(0,10),
      hash:"sha256:"+Math.random().toString(36).slice(2,10)+"...",
      custody:[user.username], notes:evForm.notes,
    };
    if (setSharedEvidence) setSharedEvidence(p=>[...p,ne]);
    else setLocalEvidence(p=>[...p,ne]);
    if (onAddEvidence) onAddEvidence(ne);
    setCases(p=>p.map(c=>c.id===lookupResult.id?{...c,history:[...c.history,{d:new Date().toISOString().slice(0,10),a:"Evidence added: "+ne.title,by:user.username}]}:c));
    if (setAuditLog) setAuditLog(al=>[{id:"AUD-EL-"+Date.now(),ts:new Date().toISOString(),actor:user.username,action:"EVIDENCE_LINKED",ref:ne.id,detail:`Evidence ${ne.id} (${ne.title}) linked to case ${lookupResult.id}. Hash: ${ne.hash}. Chain: ${user.username}.`,type:"evidence",severity:"HIGH",ip:"10.0.1."+Math.floor(Math.random()*200+10)},...al.slice(0,499)]);
    setLookupResult(p=>({...p,history:[...p.history,{d:new Date().toISOString().slice(0,10),a:"Evidence added: "+ne.title,by:user.username}]}));
    toast("Evidence added to "+lookupResult.id,"success");
    setShowAddEvidence(false); setEvForm({ title:"", type:"DOCUMENT", notes:"" });
  };

  const addWarrantToCase = () => {
    if (!wrtForm.subject || !wrtForm.grounds || !lookupResult) return;
    const nw = {
      id:"WRT-"+new Date().getFullYear()+"-"+String(allWarrants.length+1).padStart(3,"0"),
      caseId:lookupResult.id, ...wrtForm,
      issuedBy:"JDG-001", requestedBy:user.username,
      issued:new Date().toISOString().slice(0,10),
      expires:new Date(Date.now()+30*86400000).toISOString().slice(0,10),
      status:"ACTIVE",
    };
    if (setSharedWarrants) setSharedWarrants(p=>[...p,nw]);
    else setLocalWarrants(p=>[...p,nw]);
    if (onAddWarrant) onAddWarrant(nw);
    setCases(p=>p.map(c=>c.id===lookupResult.id?{...c,history:[...c.history,{d:new Date().toISOString().slice(0,10),a:"Warrant issued: "+nw.id+" ("+nw.type+")",by:user.username}]}:c));
    setLookupResult(p=>({...p,history:[...p.history,{d:new Date().toISOString().slice(0,10),a:"Warrant issued: "+nw.id,by:user.username}]}));
    toast("Warrant "+nw.id+" issued for "+lookupResult.id,"success");
    setShowAddWarrant(false); setWrtForm({ type:"ARREST", subject:"", grounds:"" });
  };

  const addNoteToCase = () => {
    if (!noteText.trim() || !lookupResult) return;
    setCases(p=>p.map(c=>c.id===lookupResult.id?{...c,notes:(c.notes?c.notes+"\n\n":"")+new Date().toLocaleDateString()+" — "+user.username+":\n"+noteText,history:[...c.history,{d:new Date().toISOString().slice(0,10),a:"Note added",by:user.username}]}:c));
    setSelected(p=>p?{...p,notes:(p.notes?p.notes+"\n\n":"")+new Date().toLocaleDateString()+" — "+user.username+":\n"+noteText}:p);
    toast("Note added to case","success");
    setShowAddNote(false); setNoteText("");
  };

  const addHearingToCase = () => {
    if (!hrForm.title || !hrForm.date || !lookupResult) return;
    INIT_HEARINGS.push({ id:"HRG-"+String(INIT_HEARINGS.length+1).padStart(3,"0"), caseId:lookupResult.id, ...hrForm, status:"SCHEDULED" });
    setCases(p=>p.map(c=>c.id===lookupResult.id?{...c,hearing:hrForm.date,history:[...c.history,{d:new Date().toISOString().slice(0,10),a:"Hearing scheduled: "+hrForm.title+" on "+hrForm.date,by:user.username}]}:c));
    setSelected(p=>p?{...p,hearing:hrForm.date}:p);
    toast("Hearing scheduled for "+lookupResult.id,"success");
    setShowAddHearing(false); setHrForm({ title:"", date:"", time:"09:00", room:"Courtroom 1", judge:"JDG-001", type:"TRIAL" });
  };

  const filtered = (filter === "ALL" ? cases : cases.filter(c => c.status === filter))
    .filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()) || (c.defendant||"").toLowerCase().includes(search.toLowerCase()));

  const createCase = () => {
    if (!form.title || !form.defendant) { toast("Title and defendant are required","error"); return; }
    const nc = {
      id:`CASE-${new Date().getFullYear()}-${String(cases.length+100).padStart(4,"0")}`,
      title:form.title, type:form.type, plaintiff:form.plaintiff, defendant:form.defendant,
      priority:form.priority, desc:form.desc, lawyer:form.lawyer||null, judge:form.judge||null,
      status:"OPEN", filed:new Date().toISOString().slice(0,10),
      hearing:form.hearing||null, charges:form.charges, location:form.location,
      notes:form.notes, courtroom:form.courtroom, relatedCaseId:form.relatedCaseId||null,
      compensation:{ eligible:form.compensation_eligible, verdict:null, reason:form.legalAidReason },
      history:[{d:new Date().toISOString().slice(0,10),a:"Case created",by:user.username},
               ...(form.lawyer?[{d:new Date().toISOString().slice(0,10),a:`Lawyer assigned: ${INIT_LAWYERS.find(l=>l.id===form.lawyer)?.name}`,by:user.username}]:[]),
               ...(form.judge?[{d:new Date().toISOString().slice(0,10),a:`Judge assigned: ${INIT_JUDGES.find(j=>j.id===form.judge)?.name}`,by:user.username}]:[])],
    };
    setCases(p => [nc,...p]);
    if (onAdd) onAdd(nc);
    if (setAuditLog) setAuditLog(prev => [{
      id:"AUD-C-"+Date.now(), ts:new Date().toISOString(),
      actor:user.username, actorId:user.id||user.username,
      action:"CASE_CREATED", ref:nc.id,
      detail:`Case created: ${nc.title} (${nc.type}, ${nc.priority} priority). Defendant: ${nc.defendant}.`,
      type:"case", ip:"10.0."+Math.floor(Math.random()*3+1)+"."+Math.floor(Math.random()*200+10),
      severity:"HIGH",
    }, ...prev.slice(0,499)]);
    toast(`Case ${nc.id} created successfully`,"success");
    setShowCreate(false);
    setForm({ title:"", type:"Criminal", plaintiff:"", defendant:"", priority:"MEDIUM", desc:"", lawyer:"", judge:"", hearing:"", notes:"", charges:"", location:"", compensation_eligible:false, legalAidReason:"", relatedCaseId:"", courtroom:"Courtroom 1" });
    setSelected(nc);
  };

  const exportCase = c => {
    const lawyer = INIT_LAWYERS.find(l => l.id === c.lawyer);
    const judge = INIT_JUDGES.find(j => j.id === c.judge);
    printDoc(`Case File — ${c.id}`, `
      <h2 style="margin-bottom:8px">${c.title}</h2>
      <div class="sub">${c.id} · Filed: ${c.filed}</div>
      <hr class="thin"/>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
        <div class="field"><div class="fl">Status</div><div class="fv">${c.status.replace(/_/g," ")}</div></div>
        <div class="field"><div class="fl">Priority</div><div class="fv">${c.priority}</div></div>
        <div class="field"><div class="fl">Type</div><div class="fv">${c.type}</div></div>
        <div class="field"><div class="fl">Filed</div><div class="fv">${c.filed}</div></div>
        <div class="field"><div class="fl">Plaintiff</div><div class="fv">${c.plaintiff}</div></div>
        <div class="field"><div class="fl">Defendant</div><div class="fv">${c.defendant}</div></div>
        <div class="field"><div class="fl">Assigned Lawyer</div><div class="fv">${lawyer?.name || "Unassigned"}</div></div>
        <div class="field"><div class="fl">Assigned Judge</div><div class="fv">${judge?.name || "Unassigned"}</div></div>
      </div>
      <div class="field" style="margin-top:12px"><div class="fl">Description</div><div style="font-size:13px;line-height:1.7;margin-top:4px">${c.desc}</div></div>
      <hr class="thin" style="margin-top:16px"/>
      <h3 style="font-size:14px;margin:12px 0 8px">Case History</h3>
      <table><thead><tr><th>Date</th><th>Action</th><th>By</th></tr></thead><tbody>
        ${(c.history||[]).map(h=>`<tr><td>${h.d}</td><td>${h.a}</td><td>${h.by}</td></tr>`).join("")}
      </tbody></table>
    `);
  };

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="stitle">Case Management</div><div className="ssub">Full case registry — click any case to open the full file</div></div>
        {canManage && <button className="btn btn-teal btn-sm" onClick={() => setShowCreate(true)}><Ico n="plus" s={13} />New Case</button>}
      </div>
      <div className="gl" />

      {}
      <div style={{ background:"linear-gradient(90deg,rgba(26,122,122,.1),rgba(26,122,122,.04),transparent)", border:"1px solid rgba(26,122,122,.25)", borderRadius:"var(--radius)", padding:"14px 18px", marginBottom:16 }}>
        <div style={{ fontSize:10, fontWeight:600, color:"var(--teal-l)", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10 }}>
          ⚡ Case ID Quick Access — Look up any case and add evidence, warrants, notes, and hearings directly
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ position:"relative", flex:"0 0 280px" }}>
            <input
              className="inp"
              value={lookupId}
              onChange={e=>setLookupId(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&doLookup()}
              placeholder="Enter Case ID  e.g. CASE-2025-0041"
              style={{ paddingRight:36, fontFamily:"'IBM Plex Mono',monospace", letterSpacing:".5px" }}
            />
            {lookupId && <span onClick={()=>{setLookupId("");setLookupResult(null);setLookupError("");}} style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", cursor:"pointer", color:"var(--dim)", fontSize:14 }}>✕</span>}
          </div>
          <button className="btn btn-teal btn-sm" onClick={doLookup}><Ico n="search" s={13}/>Look Up Case</button>
          {lookupError && <span style={{ fontSize:12, color:"#e07a6e" }}>{lookupError}</span>}
          {lookupResult && (
            <>
              <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(26,122,122,.12)", border:"1px solid rgba(26,122,122,.3)", borderRadius:"var(--radius)", padding:"5px 12px" }}>
                <div className="dot dot-green dot-pulse"/>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"var(--teal-l)" }}>{lookupResult.id}</span>
                <span style={{ fontSize:12, color:"var(--mid)", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{lookupResult.title}</span>
              </div>
              {canManage && (
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  <button className="btn btn-blue btn-xs" onClick={()=>setShowAddEvidence(true)}><Ico n="fingerprint" s={12}/>Add Evidence</button>
                  <button className="btn btn-xs" style={{ background:"rgba(201,168,76,.15)", color:"var(--gold-l)", border:"1px solid var(--gold-d)" }} onClick={()=>setShowAddWarrant(true)}><Ico n="shield" s={12}/>Issue Warrant</button>
                  <button className="btn btn-outline btn-xs" onClick={()=>setShowAddNote(true)}><Ico n="edit" s={12}/>Add Note</button>
                  <button className="btn btn-outline btn-xs" onClick={()=>setShowAddHearing(true)}><Ico n="calendar" s={12}/>Schedule Hearing</button>
                </div>
              )}
            </>
          )}
        </div>
        {!lookupResult && (
          <div style={{ marginTop:10, display:"flex", gap:8, flexWrap:"wrap" }}>
            <span style={{ fontSize:10, color:"var(--dim)" }}>Quick select:</span>
            {cases.slice(0,5).map(c=>(
              <span key={c.id} onClick={()=>{setLookupId(c.id);const found=cases.find(x=>x.id===c.id);if(found){setLookupResult(found);setSelected(found);setTab("details");}}} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"var(--teal-l)", cursor:"pointer", background:"rgba(26,122,122,.08)", padding:"2px 7px", borderRadius:2, border:"1px solid rgba(26,122,122,.2)" }}>{c.id}</span>
            ))}
          </div>
        )}
      </div>

      {}
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
        <input className="inp" style={{ maxWidth:240, flex:"0 0 240px" }} placeholder="Search title, ID, defendant…" value={search} onChange={e=>setSearch(e.target.value)}/>
        {["ALL","OPEN","UNDER_INVESTIGATION","IN_COURT","CLOSED"].map(s => (
          <button key={s} className={`btn btn-sm ${filter===s?"btn-teal":"btn-outline"}`} onClick={() => setFilter(s)}>
            {s==="ALL"?"All":s.replace(/_/g," ")} <span style={{ opacity:.6, fontSize:10 }}>({s==="ALL"?cases.length:cases.filter(c=>c.status===s).length})</span>
          </button>
        ))}
      </div>

      {}
      {selected && (
        <div className="card" style={{ marginBottom:14, border:"1px solid var(--teal-d)", boxShadow:"0 0 20px rgba(26,122,122,.08)" }}>
          {}
          <div style={{ background:"linear-gradient(90deg,rgba(26,122,122,.12),transparent)", padding:"14px 18px", borderBottom:"1px solid var(--b1)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <img src={SEAL_B64} alt="" style={{ width:32, height:32, objectFit:"contain", opacity:.7 }}/>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:15 }}>{selected.title}</div>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginTop:3 }}>
                  <span className="mo txs" style={{ color:"var(--teal-l)", letterSpacing:".5px" }}>{selected.id}</span>
                  {statusBadge(selected.status)}
                  {priorityBadge(selected.priority)}
                  <span className="tag">{selected.type}</span>
                </div>
              </div>
            </div>
            <div style={{ display:"flex", gap:7, alignItems:"center" }}>
              <button className="pdf-btn" onClick={() => exportCase(selected)}><Ico n="download" s={11} />PDF</button>
              {canManage && (
                <select className="inp" style={{ width:"auto", padding:"4px 8px", fontSize:11 }}
                  value={selected.status}
                  onChange={e => {
                    const s = e.target.value;
                    if (s === "IN_COURT" && !canClose) { toast("Insufficient authority to move case to court","error"); return; }
                    if ((s === "CLOSED" || s === "ARCHIVED") && !canClose) { toast("Case closure requires judicial or admin authority","error"); return; }
                    setCases(p => p.map(c => c.id===selected.id ? {...c,status:s,history:[...c.history,{d:new Date().toISOString().slice(0,10),a:`Status → ${s}`,by:user.username}]} : c));
                    setSelected(p => ({...p,status:s}));
                    if (setAuditLog) setAuditLog(al => [{
                      id:"AUD-ST-"+Date.now(), ts:new Date().toISOString(),
                      actor:user.username, actorId:user.id||user.username,
                      action:"CASE_STATUS_CHANGED", ref:selected.id,
                      detail:`${selected.id} status: ${selected.status} → ${s}. ${s==="IN_COURT"?"Judicial fields now restricted to assigned judge.":s==="CLOSED"?"Case closed — further modification restricted.":""}`,
                      type:"case", severity: ["IN_COURT","CLOSED","ARCHIVED"].includes(s)?"HIGH":"MEDIUM",
                      ip:"10.0."+Math.floor(Math.random()*3+1)+"."+Math.floor(Math.random()*200+10),
                    }, ...al.slice(0,499)]);
                    toast(`Status → ${s.replace(/_/g," ")}`, "success");
                  }}>
                  {(canClose ? ["OPEN","UNDER_INVESTIGATION","IN_COURT","CLOSED","ARCHIVED"] : ["OPEN","UNDER_INVESTIGATION","IN_COURT"]).map(s=><option key={s} value={s}>{s.replace(/_/g," ")}</option>)}
                </select>
              )}
              <button className="btn btn-outline btn-xs" onClick={() => setSelected(null)}><Ico n="x" s={13} /></button>
            </div>
          </div>

          <div className="card-body" style={{ padding:"0" }}>
            <div className="tabs" style={{ padding:"0 18px", marginBottom:0 }}>
              {["details","evidence","warrants","linked","history","compensation"].map(t => (
                <div key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize", fontSize:12 }}>{t}</div>
              ))}
            </div>

            <div style={{ padding:"16px 18px" }}>
              {}
              {tab==="details" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
                    {[
                      ["Case ID",      <span className="mo tsm" style={{ color:"var(--teal-l)" }}>{selected.id}</span>],
                      ["Filed Date",   selected.filed],
                      ["Next Hearing", selected.hearing||"TBD"],
                      ["Plaintiff",    selected.plaintiff||"—"],
                      ["Defendant",    selected.defendant],
                      ["Location",     selected.location||"—"],
                      ["Courtroom",    selected.courtroom||"—"],
                      ["Charges",      selected.charges||"—"],
                      ["Related Case", selected.relatedCaseId ? <span className="mo txs" style={{ color:"var(--teal-l)" }}>{selected.relatedCaseId}</span> : "None"],
                    ].map(([l,v])=>(
                      <div key={l} style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"10px 12px" }}>
                        <div className="lbl" style={{ marginBottom:4 }}>{l}</div>
                        <div style={{ fontSize:13, fontWeight:500 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                    <div style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"10px 12px" }}>
                      <div className="lbl" style={{ marginBottom:6 }}>Assigned Lawyer</div>
                      {INIT_LAWYERS.find(l=>l.id===selected.lawyer) ? (
                        <div style={{ display:"flex", gap:9, alignItems:"center" }}>
                          <div className="av" style={{ width:32, height:32, fontSize:11 }}>{INIT_LAWYERS.find(l=>l.id===selected.lawyer).name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                          <div>
                            <div style={{ fontSize:13, fontWeight:600 }}>{INIT_LAWYERS.find(l=>l.id===selected.lawyer).name}</div>
                            <div className="txs tdim">{INIT_LAWYERS.find(l=>l.id===selected.lawyer).spec} · <span className="mo">{INIT_LAWYERS.find(l=>l.id===selected.lawyer).badge}</span></div>
                          </div>
                        </div>
                      ) : <span style={{ fontSize:13, color:"var(--dim)" }}>Unassigned</span>}
                    </div>
                    <div style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"10px 12px" }}>
                      <div className="lbl" style={{ marginBottom:6 }}>Presiding Judge</div>
                      {INIT_JUDGES.find(j=>j.id===selected.judge) ? (
                        <div style={{ display:"flex", gap:9, alignItems:"center" }}>
                          <div className="av" style={{ width:32, height:32, fontSize:11 }}>{INIT_JUDGES.find(j=>j.id===selected.judge).name.replace("Hon. ","").split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                          <div>
                            <div style={{ fontSize:13, fontWeight:600 }}>{INIT_JUDGES.find(j=>j.id===selected.judge).name}</div>
                            <div className="txs tdim">{INIT_JUDGES.find(j=>j.id===selected.judge).court} · {INIT_JUDGES.find(j=>j.id===selected.judge).chamber}</div>
                          </div>
                        </div>
                      ) : <span style={{ fontSize:13, color:"var(--dim)" }}>Unassigned</span>}
                    </div>
                  </div>
                  {selected.desc && <div style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"12px 14px" }}><div className="lbl" style={{ marginBottom:4 }}>Description</div><p style={{ fontSize:13, color:"var(--mid)", lineHeight:1.8 }}>{selected.desc}</p></div>}
                  {selected.notes && <div style={{ background:"rgba(201,168,76,.06)", border:"1px solid rgba(201,168,76,.2)", borderRadius:"var(--radius)", padding:"12px 14px", marginTop:10 }}><div className="lbl" style={{ marginBottom:4, color:"var(--gold-d)" }}>Internal Notes</div><p style={{ fontSize:13, color:"var(--mid)", lineHeight:1.8 }}>{selected.notes}</p></div>}
                </div>
              )}

              {}
              {tab==="evidence" && (
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <span style={{ fontSize:13, color:"var(--mid)" }}>Evidence items linked to <span className="mo" style={{ color:"var(--teal-l)" }}>{selected.id}</span></span>
                  </div>
                  {INIT_EVIDENCE.filter(e=>e.caseId===selected.id).length === 0 ? (
                    <div className="alrt alrt-blue">No evidence linked to this case yet. Upload evidence from the Evidence Management section.</div>
                  ) : (
                    <div style={{ display:"grid", gap:9 }}>
                      {INIT_EVIDENCE.filter(e=>e.caseId===selected.id).map(e=>(
                        <div key={e.id} style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"12px 14px" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                            <div style={{ flex:1 }}>
                              <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                                <span style={{ fontSize:16 }}>{ {VIDEO:"📹",DOCUMENT:"📄",AUDIO:"🎙️",IMAGE:"🖼️",PHYSICAL:"📦"}[e.type]||"📁" }</span>
                                <span style={{ fontWeight:600, fontSize:13 }}>{e.title}</span>
                                {statusBadge(e.status)}
                                <span className="tag">{e.type}</span>
                              </div>
                              <div className="txs tdim">ID: <span className="mo">{e.id}</span> · Uploaded by: {e.by} · {e.date}</div>
                              <div className="txs tdim" style={{ marginTop:3 }}>Hash: <span className="mo" style={{ color:"var(--teal-l)" }}>{e.hash}</span></div>
                              <div style={{ marginTop:6, display:"flex", gap:5, flexWrap:"wrap" }}>
                                <span style={{ fontSize:10, color:"var(--dim)" }}>Chain of custody:</span>
                                {e.custody.map((c,i)=><span key={i} className="tag">{c}</span>)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {}
              {tab==="warrants" && (
                <div>
                  <div style={{ marginBottom:12, fontSize:13, color:"var(--mid)" }}>Warrants issued for <span className="mo" style={{ color:"var(--teal-l)" }}>{selected.id}</span></div>
                  {INIT_WARRANTS.filter(w=>w.caseId===selected.id).length === 0 ? (
                    <div className="alrt alrt-blue">No warrants linked to this case. Issue one from the Warrant System.</div>
                  ) : (
                    <div style={{ display:"grid", gap:9 }}>
                      {INIT_WARRANTS.filter(w=>w.caseId===selected.id).map(w=>(
                        <div key={w.id} style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"12px 14px" }}>
                          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                            <span className={`badge bg-${ {ARREST:"red",SEARCH:"yellow",BENCH:"gold",LEGAL_AUTH:"blue"}[w.type]||"gray" }`}>{w.type} WARRANT</span>
                            {statusBadge(w.status)}
                            <span className="mo txs tdim">{w.id}</span>
                          </div>
                          <div style={{ fontWeight:700, marginBottom:4 }}>{w.subject}</div>
                          <div className="txs tdim" style={{ marginBottom:6 }}>Issued: {w.issued} · Expires: {w.expires} · Auth: {w.issuedBy} · Requested by: {w.requestedBy}</div>
                          <div style={{ fontSize:13, color:"var(--mid)", lineHeight:1.6 }}>{w.grounds}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {}
              {tab==="linked" && (
                <div>
                  <div style={{ marginBottom:12 }}>
                    <div className="lbl">Linked Inmate(s)</div>
                    {INIT_INMATES.filter(i=>i.caseId===selected.id).length === 0 ? (
                      <div style={{ fontSize:13, color:"var(--dim)", padding:"8px 0" }}>No inmates linked to this case.</div>
                    ) : INIT_INMATES.filter(i=>i.caseId===selected.id).map(inm=>(
                      <div key={inm.id} style={{ display:"flex", gap:10, alignItems:"center", background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"10px 12px", marginBottom:8 }}>
                        <div className="av" style={{ width:36, height:36, fontSize:13 }}>{inm.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:700, fontSize:13 }}>{inm.name}</div>
                          <div className="txs tdim">Cell: {inm.cell} · {inm.block} · Intake: {inm.intake}</div>
                        </div>
                        {statusBadge(inm.status)}
                        <span className={`badge risk-${inm.risk}`}>{inm.risk}</span>
                      </div>
                    ))}
                  </div>
                  <div className="dvd"/>
                  <div>
                    <div className="lbl">Linked Hearings</div>
                    {INIT_HEARINGS.filter(h=>h.caseId===selected.id).length === 0 ? (
                      <div style={{ fontSize:13, color:"var(--dim)", padding:"8px 0" }}>No hearings scheduled for this case.</div>
                    ) : INIT_HEARINGS.filter(h=>h.caseId===selected.id).map(h=>(
                      <div key={h.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"10px 12px", marginBottom:8 }}>
                        <div>
                          <div style={{ fontWeight:600, fontSize:13 }}>{h.title}</div>
                          <div className="txs tdim">{h.date} · {h.time} · {h.room} · {INIT_JUDGES.find(j=>j.id===h.judge)?.name}</div>
                        </div>
                        <div style={{ display:"flex", gap:7 }}><span className="tag">{h.type}</span>{statusBadge(h.status)}</div>
                      </div>
                    ))}
                  </div>
                  {selected.relatedCaseId && (
                    <div style={{ marginTop:12 }}>
                      <div className="lbl">Related Case</div>
                      <div style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"10px 12px" }}>
                        <span className="mo tsm" style={{ color:"var(--teal-l)" }}>{selected.relatedCaseId}</span>
                        <span style={{ fontSize:13, color:"var(--mid)", marginLeft:10 }}>{cases.find(c=>c.id===selected.relatedCaseId)?.title||"Case not found"}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {}
              {tab==="history" && (
                <div className="tline">
                  {[...selected.history].reverse().map((h,i) => (
                    <div key={i} className="tline-item">
                      <div style={{ fontSize:13, fontWeight:500 }}>{h.a}</div>
                      <div className="txs tdim" style={{ marginTop:2 }}>{h.d} · {h.by}</div>
                    </div>
                  ))}
                </div>
              )}

              {}
              {tab==="compensation" && (
                <div>
                  <div className="alrt alrt-gold">Government Legal Aid: $5,000 (Not Guilty) · $2,500 (Guilty plea)</div>
                  <div className="g3" style={{ gap:10, marginBottom:14 }}>
                    <div style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"12px 14px" }}>
                      <div className="lbl">Legal Aid Eligible</div>
                      <span className={`badge bg-${selected.compensation?.eligible?"green":"gray"}`}>{selected.compensation?.eligible?"YES":"NO"}</span>
                      {selected.compensation?.reason && <div className="txs tdim" style={{ marginTop:6 }}>{selected.compensation.reason}</div>}
                    </div>
                    <div style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"12px 14px" }}>
                      <div className="lbl">Current Verdict</div>
                      <span className={`badge bg-${selected.compensation?.verdict==="NOT_GUILTY"?"green":selected.compensation?.verdict?"yellow":"gray"}`}>{selected.compensation?.verdict||"Pending"}</span>
                    </div>
                    <div style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"12px 14px" }}>
                      <div className="lbl">Compensation Due</div>
                      <span className="mo tsm" style={{ color:selected.compensation?.verdict?"#4cd98a":"var(--dim)" }}>
                        {selected.compensation?.verdict==="NOT_GUILTY"?"$5,000":selected.compensation?.verdict?"$2,500":"Awaiting verdict"}
                      </span>
                    </div>
                  </div>
                  {canManage && (
                    <div>
                      <div className="lbl" style={{ marginBottom:8 }}>Set Verdict
                        {selected.status==="IN_COURT" && !caseFieldGuard(selected,"verdict") && (
                          <span className="badge bg-red" style={{ marginLeft:8, fontSize:9 }}>🔒 JUDICIAL FIELD — JUDGE ONLY</span>
                        )}
                      </div>
                      {selected.status==="IN_COURT" && !caseFieldGuard(selected,"verdict") ? (
                        <div className="alrt alrt-gold" style={{ fontSize:11, padding:"6px 10px" }}>
                          ⚖ This case is In Court. Verdict fields are restricted to the assigned judge only. Use the Judicial Workspace to record verdicts.
                        </div>
                      ) : (
                      <div style={{ display:"flex", gap:8 }}>
                        {["NOT_GUILTY","GUILTY","DISMISSED","MISTRIAL"].map(v=>(
                          <button key={v} className={`btn btn-sm ${selected.compensation?.verdict===v?"btn-teal":"btn-outline"}`} onClick={()=>{
                            setCases(p=>p.map(c=>c.id===selected.id?{...c,compensation:{...c.compensation,verdict:v},history:[...c.history,{d:new Date().toISOString().slice(0,10),a:`Verdict recorded: ${v}`,by:user.username}]}:c));
                            setSelected(p=>({...p,compensation:{...p.compensation,verdict:v}}));
                            if (setAuditLog) setAuditLog(al=>[{id:"AUD-V-"+Date.now(),ts:new Date().toISOString(),actor:user.username,action:"VERDICT_RECORDED",ref:selected.id,detail:`Verdict: ${v} recorded for ${selected.id}`,type:"case",severity:"CRITICAL",ip:"10.0.1."+Math.floor(Math.random()*200+10)},...al.slice(0,499)]);
                            toast(`Verdict recorded: ${v}`,"success");
                          }}>{v.replace(/_/g," ")}</button>
                        ))}
                      </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {}
      <div style={{ display:"grid", gap:8 }}>
        {filtered.length === 0 && <div style={{ textAlign:"center", color:"var(--dim)", padding:32, fontSize:13 }}>No cases match your search.</div>}
        {filtered.map(c => (
          <div key={c.id} className="card" style={{ borderColor:selected?.id===c.id?"var(--teal-d)":"var(--b1)", transition:"all .15s" }}>
            <div style={{ padding:"12px 16px", display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:38, height:38, borderRadius:"var(--radius)", background:`rgba(26,122,122,.1)`, border:"1px solid rgba(26,122,122,.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Ico n="briefcase" s={16} c="var(--teal-l)"/>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                  <span style={{ fontWeight:700, fontSize:14 }}>{c.title}</span>
                  {priorityBadge(c.priority)}
                </div>
                <div className="txs" style={{ color:"var(--dim)", display:"flex", gap:10, flexWrap:"wrap" }}>
                  <span className="mo" style={{ color:"var(--teal-l)" }}>{c.id}</span>
                  <span>·</span><span>{c.type}</span>
                  <span>·</span><span>vs. {c.defendant}</span>
                  <span>·</span><span>Filed {c.filed}</span>
                  {c.hearing && <><span>·</span><span>Hearing {c.hearing}</span></>}
                </div>
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                {INIT_EVIDENCE.filter(e=>e.caseId===c.id).length > 0 && (
                  <span className="badge bg-blue" style={{ fontSize:"9px" }}>{INIT_EVIDENCE.filter(e=>e.caseId===c.id).length} EVD</span>
                )}
                {INIT_WARRANTS.filter(w=>w.caseId===c.id).length > 0 && (
                  <span className="badge bg-gold" style={{ fontSize:"9px" }}>{INIT_WARRANTS.filter(w=>w.caseId===c.id).length} WRT</span>
                )}
                {statusBadge(c.status)}
                {}
                <button
                  className="btn btn-teal btn-sm"
                  style={{ padding:"5px 14px", fontWeight:700, letterSpacing:".5px" }}
                  onClick={() => { setSelected(selected?.id===c.id ? null : c); setTab("details"); }}
                >
                  {selected?.id===c.id ? "▲ Close" : "▶ View"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {}
      {showCreate && (
        <div className="mo-ov">
          <div className="mo-box mo-lg" style={{ maxWidth:820 }}>
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700, fontSize:15 }}>Create New Case</div>
                <div className="txs tdim">Auto-ID will be generated · All fields with * are required</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setShowCreate(false)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd" style={{ display:"grid", gap:0 }}>
              {}
              <div style={{ background:"rgba(26,122,122,.05)", border:"1px solid rgba(26,122,122,.15)", borderRadius:"var(--radius)", padding:"12px 14px", marginBottom:14 }}>
                <div style={{ fontSize:10, fontWeight:600, color:"var(--teal-l)", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:10 }}>Core Information</div>
                <div className="fg"><label className="lbl">Case Title *</label><input className="inp" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="e.g. State v. John Doe — Armed Robbery"/></div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                  <div className="fg"><label className="lbl">Case Type *</label>
                    <select className="inp" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>
                      <option>Criminal</option><option>Civil</option><option>Traffic</option><option>Constitutional</option><option>Federal</option><option>Juvenile</option><option>Probate</option>
                    </select>
                  </div>
                  <div className="fg"><label className="lbl">Priority *</label>
                    <select className="inp" value={form.priority} onChange={e=>setForm(p=>({...p,priority:e.target.value}))}>
                      <option>CRITICAL</option><option>HIGH</option><option>MEDIUM</option><option>LOW</option>
                    </select>
                  </div>
                  <div className="fg"><label className="lbl">Courtroom</label>
                    <select className="inp" value={form.courtroom} onChange={e=>setForm(p=>({...p,courtroom:e.target.value}))}>
                      <option>Courtroom 1</option><option>Courtroom 3</option><option>Courtroom 5</option><option>Chambers</option>
                    </select>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div className="fg"><label className="lbl">Plaintiff / Complainant *</label><input className="inp" value={form.plaintiff} onChange={e=>setForm(p=>({...p,plaintiff:e.target.value}))} placeholder="State / City / Person"/></div>
                  <div className="fg"><label className="lbl">Defendant *</label><input className="inp" value={form.defendant} onChange={e=>setForm(p=>({...p,defendant:e.target.value}))} placeholder="Full legal name"/></div>
                </div>
                <div className="fg"><label className="lbl">Charges / Offences</label><input className="inp" value={form.charges} onChange={e=>setForm(p=>({...p,charges:e.target.value}))} placeholder="e.g. Armed Robbery (Class A), Assault (Class B)"/></div>
                <div className="fg"><label className="lbl">Incident Location</label><input className="inp" value={form.location} onChange={e=>setForm(p=>({...p,location:e.target.value}))} placeholder="Street address or area"/></div>
              </div>

              {}
              <div style={{ background:"rgba(22,77,140,.05)", border:"1px solid rgba(22,77,140,.15)", borderRadius:"var(--radius)", padding:"12px 14px", marginBottom:14 }}>
                <div style={{ fontSize:10, fontWeight:600, color:"#5aabec", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:10 }}>Case Personnel</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div className="fg">
                    <label className="lbl">Assign Lawyer</label>
                    <select className="inp" value={form.lawyer} onChange={e=>setForm(p=>({...p,lawyer:e.target.value}))}>
                      <option value="">— Unassigned —</option>
                      {INIT_LAWYERS.filter(l=>l.status==="ACTIVE").map(l=><option key={l.id} value={l.id}>{l.name} · {l.spec} · {l.winRate}% win</option>)}
                    </select>
                  </div>
                  <div className="fg">
                    <label className="lbl">Assign Judge</label>
                    <select className="inp" value={form.judge} onChange={e=>setForm(p=>({...p,judge:e.target.value}))}>
                      <option value="">— Unassigned —</option>
                      {INIT_JUDGES.filter(j=>j.status==="ACTIVE").map(j=><option key={j.id} value={j.id}>{j.name} · {j.court}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {}
              <div style={{ background:"rgba(196,154,0,.04)", border:"1px solid rgba(196,154,0,.15)", borderRadius:"var(--radius)", padding:"12px 14px", marginBottom:14 }}>
                <div style={{ fontSize:10, fontWeight:600, color:"var(--gold-l)", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:10 }}>Scheduling &amp; Links</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div className="fg"><label className="lbl">First Hearing Date</label><input className="inp" type="date" value={form.hearing} onChange={e=>setForm(p=>({...p,hearing:e.target.value}))}/></div>
                  <div className="fg">
                    <label className="lbl">Related Case (optional)</label>
                    <select className="inp" value={form.relatedCaseId} onChange={e=>setForm(p=>({...p,relatedCaseId:e.target.value}))}>
                      <option value="">None</option>
                      {cases.map(c=><option key={c.id} value={c.id}>{c.id} — {c.title.slice(0,30)}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div className="fg"><label className="lbl">Case Description / Summary</label><textarea className="inp" style={{ minHeight:80 }} value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))} placeholder="Summarize the case, background, key facts…"/></div>
                <div className="fg"><label className="lbl">Internal Notes (confidential)</label><textarea className="inp" style={{ minHeight:80 }} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Internal notes, not shown publicly…"/></div>
              </div>

              <div style={{ background:"rgba(201,168,76,.06)", border:"1px solid rgba(201,168,76,.2)", borderRadius:"var(--radius)", padding:"12px 14px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:form.compensation_eligible?10:0 }}>
                  <input type="checkbox" id="elig" checked={form.compensation_eligible} onChange={e=>setForm(p=>({...p,compensation_eligible:e.target.checked}))} style={{ width:14, height:14, accentColor:"var(--teal)" }}/>
                  <label htmlFor="elig" style={{ fontSize:13, cursor:"pointer" }}>Eligible for Government Legal Aid ($5,000 not guilty / $2,500 guilty)</label>
                </div>
                {form.compensation_eligible && <div className="fg" style={{ marginBottom:0 }}><label className="lbl">Legal Aid Reason</label><input className="inp" value={form.legalAidReason} onChange={e=>setForm(p=>({...p,legalAidReason:e.target.value}))} placeholder="e.g. Defendant cannot afford private counsel"/></div>}
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowCreate(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={createCase}><Ico n="plus" s={13}/>Create Case</button>
            </div>
          </div>
        </div>
      )}
      {}
      {showAddEvidence && lookupResult && (
        <div className="mo-ov">
          <div className="mo-box">
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>Add Evidence to Case</div>
                <div className="txs tdim">Linking to: <span className="mo" style={{ color:"var(--teal-l)" }}>{lookupResult.id}</span> — {lookupResult.title}</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setShowAddEvidence(false)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-blue">Evidence will be cryptographically hashed and added to the chain of custody for <span className="mo">{lookupResult.id}</span>.</div>
              <div className="fg"><label className="lbl">Evidence Title *</label><input className="inp" value={evForm.title} onChange={e=>setEvForm(p=>({...p,title:e.target.value}))} placeholder="e.g. CCTV Footage — 5th Ave, 14 Jan"/></div>
              <div className="fg">
                <label className="lbl">Evidence Type</label>
                <select className="inp" value={evForm.type} onChange={e=>setEvForm(p=>({...p,type:e.target.value}))}>
                  <option>DOCUMENT</option><option>VIDEO</option><option>AUDIO</option><option>IMAGE</option><option>PHYSICAL</option><option>DIGITAL</option><option>FORENSIC</option>
                </select>
              </div>
              <div className="fg"><label className="lbl">Description / Notes</label><textarea className="inp" value={evForm.notes} onChange={e=>setEvForm(p=>({...p,notes:e.target.value}))} placeholder="Describe the evidence, where it was obtained, relevance…"/></div>
              <div style={{ background:"var(--surf)", border:"1px dashed var(--b2)", borderRadius:"var(--radius)", padding:"18px", textAlign:"center", color:"var(--dim)", fontSize:12 }}>
                📁 File Upload Simulated — Max 50MB · PDF, MP4, MP3, JPG, PNG, ZIP
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowAddEvidence(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={addEvidenceToCase}><Ico n="fingerprint" s={13}/>Submit Evidence</button>
            </div>
          </div>
        </div>
      )}

      {}
      {showAddWarrant && lookupResult && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>Issue Warrant</div>
                <div className="txs tdim">For case: <span className="mo" style={{ color:"var(--teal-l)" }}>{lookupResult.id}</span> — {lookupResult.title}</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setShowAddWarrant(false)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-gold">Warrants are legally binding. Ensure probable cause is established before issuance.</div>
              <div className="fg">
                <label className="lbl">Warrant Type</label>
                <select className="inp" value={wrtForm.type} onChange={e=>setWrtForm(p=>({...p,type:e.target.value}))}>
                  <option value="ARREST">Arrest Warrant</option>
                  <option value="SEARCH">Search Warrant</option>
                  <option value="BENCH">Bench Warrant</option>
                  <option value="LEGAL_AUTH">Legal Authorization</option>
                  <option value="SEIZURE">Asset Seizure Warrant</option>
                  <option value="SURVEILLANCE">Surveillance Warrant</option>
                </select>
              </div>
              <div className="fg"><label className="lbl">Subject / Location *</label><input className="inp" value={wrtForm.subject} onChange={e=>setWrtForm(p=>({...p,subject:e.target.value}))} placeholder="Person full name or property address"/></div>
              <div className="fg"><label className="lbl">Legal Grounds / Probable Cause *</label><textarea className="inp" style={{ minHeight:100 }} value={wrtForm.grounds} onChange={e=>setWrtForm(p=>({...p,grounds:e.target.value}))} placeholder="State the legal basis, probable cause, evidence supporting this warrant request…"/></div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowAddWarrant(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={addWarrantToCase}><Ico n="shield" s={13}/>Issue Warrant</button>
            </div>
          </div>
        </div>
      )}

      {}
      {showAddNote && lookupResult && (
        <div className="mo-ov">
          <div className="mo-box">
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>Add Internal Note</div>
                <div className="txs tdim"><span className="mo" style={{ color:"var(--teal-l)" }}>{lookupResult.id}</span></div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setShowAddNote(false)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-teal">Notes are confidential and only visible to authorized personnel.</div>
              <div className="fg"><label className="lbl">Note Content</label><textarea className="inp" style={{ minHeight:120 }} value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Enter your internal note, observations, or instructions…"/></div>
              {lookupResult.notes && (
                <div style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:"10px 12px", marginTop:8 }}>
                  <div className="lbl" style={{ marginBottom:6 }}>Existing Notes</div>
                  <pre style={{ fontSize:12, color:"var(--mid)", whiteSpace:"pre-wrap", lineHeight:1.7, fontFamily:"'IBM Plex Mono',monospace" }}>{lookupResult.notes}</pre>
                </div>
              )}
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowAddNote(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={addNoteToCase}><Ico n="edit" s={13}/>Save Note</button>
            </div>
          </div>
        </div>
      )}

      {}
      {showAddHearing && lookupResult && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>Schedule Hearing</div>
                <div className="txs tdim">For case: <span className="mo" style={{ color:"var(--teal-l)" }}>{lookupResult.id}</span> — {lookupResult.title}</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setShowAddHearing(false)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="fg"><label className="lbl">Hearing Title *</label><input className="inp" value={hrForm.title} onChange={e=>setHrForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Trial — State v. Doe"/></div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                <div className="fg"><label className="lbl">Hearing Type</label>
                  <select className="inp" value={hrForm.type} onChange={e=>setHrForm(p=>({...p,type:e.target.value}))}>
                    <option>TRIAL</option><option>PRETRIAL</option><option>BAIL</option><option>MOTION</option><option>EVIDENCE</option><option>SENTENCING</option><option>APPEAL</option>
                  </select>
                </div>
                <div className="fg"><label className="lbl">Date *</label><input className="inp" type="date" value={hrForm.date} onChange={e=>setHrForm(p=>({...p,date:e.target.value}))}/></div>
                <div className="fg"><label className="lbl">Time</label><input className="inp" type="time" value={hrForm.time} onChange={e=>setHrForm(p=>({...p,time:e.target.value}))}/></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div className="fg"><label className="lbl">Courtroom</label>
                  <select className="inp" value={hrForm.room} onChange={e=>setHrForm(p=>({...p,room:e.target.value}))}>
                    <option>Courtroom 1</option><option>Courtroom 3</option><option>Courtroom 5</option><option>Chambers</option>
                  </select>
                </div>
                <div className="fg"><label className="lbl">Presiding Judge</label>
                  <select className="inp" value={hrForm.judge} onChange={e=>setHrForm(p=>({...p,judge:e.target.value}))}>
                    {INIT_JUDGES.filter(j=>j.status==="ACTIVE").map(j=><option key={j.id} value={j.id}>{j.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowAddHearing(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={addHearingToCase}><Ico n="calendar" s={13}/>Schedule Hearing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EvidencePage = ({ user, evidence: evidenceProp, setEvidence: setEvidenceProp, onAdd, setAuditLog }) => {
  if (!hasPerm(user?.role, "EVIDENCE_VIEW")) return (<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:320,gap:16}}>
    <div style={{fontSize:48}}>🔒</div>
    <div style={{fontWeight:700,fontSize:18,color:"var(--teal-l)",letterSpacing:"1px"}}>ACCESS RESTRICTED</div>
    <div style={{color:"var(--dim)",fontSize:13,textAlign:"center",maxWidth:380,lineHeight:1.7}}>
      This section is restricted to verified Department of Justice personnel only.<br/>
      Your current role (<strong style={{color:"var(--gold-l)"}}>{ROLES[user?.role]?.label||user?.role}</strong>) does not have the required permissions.
    </div>
    <div style={{fontSize:11,color:"var(--dim)",background:"var(--surf)",border:"1px solid var(--b1)",padding:"8px 16px",borderRadius:"var(--radius)",fontFamily:"'IBM Plex Mono',monospace"}}>
      ERR_ACCESS_DENIED · {user?.role||"UNAUTHENTICATED"} · {new Date().toISOString().slice(0,19)}Z
    </div>
  </div>);
  const [localEvidence, setLocalEvidence] = useState(INIT_EVIDENCE);
  const evidence = evidenceProp || localEvidence;
  const setEvidence = setEvidenceProp || setLocalEvidence;
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ caseId:"", title:"", type:"DOCUMENT" });
  const canUpload  = hasPerm(user.role, "EVIDENCE_UPLOAD");
  const canVerify  = hasPerm(user.role, "EVIDENCE_VERIFY");
  const canDelete  = hasPerm(user.role, "EVIDENCE_DELETE");

  const addEvidence = () => {
    if (!form.title) return;
    const ne = { id:`EVD-${String(evidence.length+1).padStart(3,"0")}`, ...form, status:"UNDER_REVIEW", by:user.username, date:new Date().toISOString().slice(0,10), hash:`sha256:${Math.random().toString(36).slice(2,10)}...`, custody:[user.username] };
    setEvidence(p => [...p, ne]);
    if (onAdd) onAdd(ne);
    if (setAuditLog) setAuditLog(al => [{
      id:"AUD-E-"+Date.now(), ts:new Date().toISOString(),
      actor:user.username, actorId:user.id||user.username,
      action:"EVIDENCE_UPLOADED", ref:ne.id,
      detail:`Evidence uploaded: ${ne.title} (${ne.type}). Case: ${ne.caseId||"Unlinked"}. Hash: ${ne.hash}. Chain-of-custody: ${user.username}.`,
      type:"evidence", severity:"HIGH",
      ip:"10.0."+Math.floor(Math.random()*3+1)+"."+Math.floor(Math.random()*200+10),
    }, ...al.slice(0,499)]);
    toast("Evidence uploaded", "success"); setShowAdd(false); setForm({ caseId:"", title:"", type:"DOCUMENT" });
  };

  const typeIco = { VIDEO:"📹", DOCUMENT:"📄", AUDIO:"🎙️", IMAGE:"🖼️", PHYSICAL:"📦" };
  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div><div className="stitle">Evidence Management</div><div className="ssub">Secure storage, hash verification, chain of custody</div></div>
        {canUpload && <button className="btn btn-teal btn-sm" onClick={()=>setShowAdd(true)}><Ico n="plus" s={13}/>Upload Evidence</button>}
      </div>
      <div className="gl"/>
      <div className="card" style={{ overflowX:"auto" }}>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Title</th><th>Type</th><th>Case</th><th>Status</th><th>Uploaded</th><th>Hash</th></tr></thead>
          <tbody>
            {evidence.map(e => (
              <tr key={e.id}>
                <td className="mo txs tdim">{e.id}</td>
                <td><span style={{ marginRight:6 }}>{typeIco[e.type]||"📁"}</span>{e.title}</td>
                <td><span className="tag">{e.type}</span></td>
                <td className="mo txs tdim">{e.caseId||"—"}</td>
                <td>{statusBadge(e.status)}</td>
                <td className="tsm tmid">{e.date}</td>
                <td className="mo txs tdim" style={{ maxWidth:120, overflow:"hidden", textOverflow:"ellipsis" }}>{e.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAdd && (
        <div className="mo-ov">
          <div className="mo-box">
            <div className="mo-hd"><span style={{ fontWeight:700 }}>Upload Evidence</span><button className="btn btn-outline btn-xs" onClick={()=>setShowAdd(false)}><Ico n="x" s={13}/></button></div>
            <div className="mo-bd">
              <div className="alrt alrt-blue">All evidence is cryptographically hashed and tracked through chain of custody.</div>
              <div className="fg"><label className="lbl">Evidence Title</label><input className="inp" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="Descriptive title…"/></div>
              <div className="g2">
                <div className="fg"><label className="lbl">Type</label><select className="inp" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}><option>DOCUMENT</option><option>VIDEO</option><option>AUDIO</option><option>IMAGE</option><option>PHYSICAL</option></select></div>
                <div className="fg"><label className="lbl">Linked Case</label><select className="inp" value={form.caseId} onChange={e=>setForm(p=>({...p,caseId:e.target.value}))}><option value="">None</option>{INIT_CASES.map(c=><option key={c.id} value={c.id}>{c.id}</option>)}</select></div>
              </div>
              <div className="fg"><label className="lbl">File Upload</label><div style={{ border:"1px dashed var(--b2)", borderRadius:"var(--radius)", padding:"18px", textAlign:"center", color:"var(--dim)", fontSize:13 }}>📁 Simulated upload — drag file here<br/><span style={{ fontSize:11 }}>Max 50MB · PDF, MP4, MP3, JPG, PNG</span></div></div>
            </div>
            <div className="mo-ft"><button className="btn btn-outline" onClick={()=>setShowAdd(false)}>Cancel</button><button className="btn btn-teal" onClick={addEvidence}>Submit Evidence</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

const WarrantsPage = ({ user, type = "ALL", warrants: warrantsProp, setWarrants: setWarrantsProp, onAdd }) => {
  const [localWarrants, setLocalWarrants] = useState(INIT_WARRANTS);
  const warrants = warrantsProp || localWarrants;
  const setWarrants = setWarrantsProp || setLocalWarrants;
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type:"ARREST", subject:"", caseId:"", grounds:"" });
  const canIssue  = hasPerm(user.role, "WARRANT_ISSUE");
  const canRequest= hasPerm(user.role, "WARRANT_REQUEST");
  const display = type === "BENCH" ? warrants.filter(w => w.type === "BENCH") : type === "ALL" ? warrants : warrants.filter(w => w.type !== "BENCH");

  const issue = () => {
    if (!form.subject || !form.grounds) return;
    const nw = { id:`WRT-${new Date().getFullYear()}-${String(warrants.length+1).padStart(3,"0")}`, ...form, issuedBy:"JDG-001", requestedBy:user.username, issued:new Date().toISOString().slice(0,10), expires:new Date(Date.now()+30*86400000).toISOString().slice(0,10), status:"ACTIVE" };
    setWarrants(p => [...p, nw]);
    if (onAdd) onAdd(nw);
    toast("Warrant issued successfully", "success"); setShowAdd(false); setForm({ type:"ARREST", subject:"", caseId:"", grounds:"" });
  };

  const exportWarrant = w => {
    printDoc(`Warrant — ${w.id}`, `
      <h2>OFFICIAL WARRANT</h2>
      <div class="sub">${w.type.replace(/_/g," ")} WARRANT · ${w.id}</div>
      <hr class="thin"/>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
        <div class="field"><div class="fl">Warrant Type</div><div class="fv">${w.type}</div></div>
        <div class="field"><div class="fl">Status</div><div class="fv">${w.status}</div></div>
        <div class="field"><div class="fl">Subject</div><div class="fv">${w.subject}</div></div>
        <div class="field"><div class="fl">Case ID</div><div class="fv">${w.caseId||"None"}</div></div>
        <div class="field"><div class="fl">Issued By</div><div class="fv">${w.issuedBy}</div></div>
        <div class="field"><div class="fl">Requested By</div><div class="fv">${w.requestedBy}</div></div>
        <div class="field"><div class="fl">Issue Date</div><div class="fv">${w.issued}</div></div>
        <div class="field"><div class="fl">Expiry Date</div><div class="fv">${w.expires}</div></div>
      </div>
      <div class="field" style="margin-top:14px"><div class="fl">Legal Grounds</div><div style="font-size:13px;line-height:1.7;margin-top:4px">${w.grounds}</div></div>
    `);
  };

  const typeColor = { ARREST:"red", SEARCH:"yellow", BENCH:"gold", LEGAL_AUTH:"blue" };

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div><div className="stitle">{type === "BENCH" ? "Bench Warrants" : "Warrant System"}</div><div className="ssub">Legal authorizations and warrant registry</div></div>
        {canIssue && <button className="btn btn-teal btn-sm" onClick={()=>setShowAdd(true)}><Ico n="plus" s={13}/>Issue Warrant</button>}
      </div>
      <div className="gl"/>
      {!canIssue && <div className="alrt alrt-blue" style={{ marginBottom:14 }}>Read-only. Warrant issuance requires Deputy Chief authority or higher.</div>}
      <div style={{ display:"grid", gap:11 }}>
        {display.map(w => (
          <div key={w.id} className="card" style={{ borderColor:"rgba(26,122,122,.2)" }}>
            <div className="card-body" style={{ padding:"13px 16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                    <span className={`badge bg-${typeColor[w.type]||"gray"}`}>{w.type.replace(/_/g," ")} WARRANT</span>
                    {statusBadge(w.status)}
                  </div>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>{w.subject}</div>
                  <div className="txs tdim" style={{ marginBottom:8 }}><span className="mo">{w.id}</span> · Case: <span className="mo">{w.caseId||"None"}</span> · Requested by: {w.requestedBy}</div>
                  <p style={{ fontSize:13, color:"var(--mid)", lineHeight:1.6 }}>{w.grounds}</p>
                  <div style={{ marginTop:8, display:"flex", gap:16 }} className="txs tdim">
                    <span>Issued: {w.issued}</span><span>Expires: {w.expires}</span><span>Auth: {w.issuedBy}</span>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:7, alignItems:"flex-end" }}>
                  <button className="pdf-btn" onClick={()=>exportWarrant(w)}><Ico n="download" s={11}/>PDF</button>
                  {canIssue && w.status === "ACTIVE" && (
                    <button className="btn btn-xs btn-outline" onClick={()=>{setWarrants(p=>p.map(x=>x.id===w.id?{...x,status:"EXECUTED"}:x));toast("Warrant marked executed","success");}}>Mark Executed</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showAdd && (
        <div className="mo-ov">
          <div className="mo-box">
            <div className="mo-hd"><span style={{ fontWeight:700 }}>Issue New Warrant</span><button className="btn btn-outline btn-xs" onClick={()=>setShowAdd(false)}><Ico n="x" s={13}/></button></div>
            <div className="mo-bd">
              <div className="alrt alrt-gold">Warrants are legally binding. Ensure grounds are legally sufficient before submission.</div>
              <div className="fg"><label className="lbl">Warrant Type</label><select className="inp" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}><option value="ARREST">Arrest Warrant</option><option value="SEARCH">Search Warrant</option><option value="BENCH">Bench Warrant</option><option value="LEGAL_AUTH">Legal Authorization</option></select></div>
              <div className="fg"><label className="lbl">Subject / Location</label><input className="inp" value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))} placeholder="Person name or address"/></div>
              <div className="fg"><label className="lbl">Linked Case</label><select className="inp" value={form.caseId} onChange={e=>setForm(p=>({...p,caseId:e.target.value}))}><option value="">None</option>{INIT_CASES.map(c=><option key={c.id} value={c.id}>{c.id}</option>)}</select></div>
              <div className="fg"><label className="lbl">Legal Grounds</label><textarea className="inp" style={{ minHeight:90 }} value={form.grounds} onChange={e=>setForm(p=>({...p,grounds:e.target.value}))} placeholder="State probable cause and legal basis…"/></div>
            </div>
            <div className="mo-ft"><button className="btn btn-outline" onClick={()=>setShowAdd(false)}>Cancel</button><button className="btn btn-gold" onClick={issue}>Issue Warrant</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

const CalendarPage = ({ user }) => {
  const [hearings, setHearings] = useState(INIT_HEARINGS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ caseId:"", title:"", date:"", time:"09:00", room:"Courtroom 1", judge:"JDG-001", type:"TRIAL" });
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const [viewMonth, setViewMonth] = useState({ year:today.getFullYear(), month:today.getMonth() });
  const canSchedule = canDo(user.role, 7);

  const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();
  const firstDay = new Date(viewMonth.year, viewMonth.month, 1).getDay();
  const monthName = new Date(viewMonth.year, viewMonth.month, 1).toLocaleString("default", { month:"long", year:"numeric" });

  const getHearingsForDay = day => {
    const dateStr = `${viewMonth.year}-${String(viewMonth.month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return hearings.filter(h => h.date === dateStr);
  };

  const addHearing = () => {
    if (!form.title || !form.date) return;
    setHearings(p => [...p, { id:`HRG-${String(p.length+1).padStart(3,"0")}`, ...form, status:"SCHEDULED" }]);
    toast("Hearing scheduled", "success"); setShowAdd(false);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day:null });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day:d });

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div><div className="stitle">Court Schedule</div><div className="ssub">Hearings calendar and scheduling management</div></div>
        {canSchedule && <button className="btn btn-teal btn-sm" onClick={()=>setShowAdd(true)}><Ico n="plus" s={13}/>Schedule Hearing</button>}
      </div>
      <div className="gl"/>
      <div className="card">
        <div className="card-header">
          <button className="btn btn-outline btn-xs" onClick={()=>setViewMonth(p=>({...p,month:p.month===0?11:p.month-1,year:p.month===0?p.year-1:p.year}))}>‹</button>
          <span style={{ fontWeight:600 }}>{monthName}</span>
          <button className="btn btn-outline btn-xs" onClick={()=>setViewMonth(p=>({...p,month:p.month===11?0:p.month+1,year:p.month===11?p.year+1:p.year}))}>›</button>
        </div>
        <div className="cal-day-hd">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d} className="cal-dh">{d}</div>)}
        </div>
        <div className="cal-grid">
          {cells.map((cell, i) => {
            if (!cell.day) return <div key={i} className="cal-cell other"/>;
            const dayHearings = getHearingsForDay(cell.day);
            const isToday = cell.day === today.getDate() && viewMonth.month === today.getMonth() && viewMonth.year === today.getFullYear();
            return (
              <div key={i} className={`cal-cell${isToday?" today":""}`} onClick={()=>setSelectedDate(cell.day)}>
                <div style={{ fontSize:11, color:isToday?"var(--teal-l)":"var(--dim)", fontWeight:isToday?700:400 }}>{cell.day}</div>
                {dayHearings.map(h => (
                  <div key={h.id} className={`cal-ev${h.status==="COMPLETED"?" done":h.type==="TRIAL"?" urgent":""}`} title={h.title}>{h.time} {h.title}</div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {}
      <div className="card" style={{ marginTop:16 }}>
        <div className="card-header"><span style={{ fontWeight:600 }}>Upcoming Hearings</span><span className="badge bg-teal">{hearings.filter(h=>h.status==="SCHEDULED").length} Scheduled</span></div>
        <div style={{ overflowX:"auto" }}>
          <table className="tbl">
            <thead><tr><th>ID</th><th>Title</th><th>Date &amp; Time</th><th>Courtroom</th><th>Judge</th><th>Type</th><th>Status</th></tr></thead>
            <tbody>
              {hearings.map(h => (
                <tr key={h.id}>
                  <td className="mo txs tdim">{h.id}</td>
                  <td style={{ fontWeight:500 }}>{h.title}</td>
                  <td className="tsm"><span className="mo">{h.date}</span> {h.time}</td>
                  <td className="tsm">{h.room}</td>
                  <td className="tsm tmid">{INIT_JUDGES.find(j=>j.id===h.judge)?.name||h.judge}</td>
                  <td><span className="tag">{h.type}</span></td>
                  <td>{statusBadge(h.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd"><span style={{ fontWeight:700 }}>Schedule Hearing</span><button className="btn btn-outline btn-xs" onClick={()=>setShowAdd(false)}><Ico n="x" s={13}/></button></div>
            <div className="mo-bd">
              <div className="fg"><label className="lbl">Hearing Title</label><input className="inp" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Trial — State v. Doe"/></div>
              <div className="g2">
                <div className="fg"><label className="lbl">Date</label><input className="inp" type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/></div>
                <div className="fg"><label className="lbl">Time</label><input className="inp" type="time" value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))}/></div>
              </div>
              <div className="g2">
                <div className="fg"><label className="lbl">Hearing Type</label><select className="inp" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}><option>TRIAL</option><option>PRETRIAL</option><option>BAIL</option><option>MOTION</option><option>EVIDENCE</option><option>SENTENCING</option></select></div>
                <div className="fg"><label className="lbl">Courtroom</label><select className="inp" value={form.room} onChange={e=>setForm(p=>({...p,room:e.target.value}))}><option>Courtroom 1</option><option>Courtroom 3</option><option>Courtroom 5</option></select></div>
              </div>
              <div className="g2">
                <div className="fg"><label className="lbl">Presiding Judge</label><select className="inp" value={form.judge} onChange={e=>setForm(p=>({...p,judge:e.target.value}))}>{INIT_JUDGES.map(j=><option key={j.id} value={j.id}>{j.name}</option>)}</select></div>
                <div className="fg"><label className="lbl">Linked Case</label><select className="inp" value={form.caseId} onChange={e=>setForm(p=>({...p,caseId:e.target.value}))}><option value="">None</option>{INIT_CASES.map(c=><option key={c.id} value={c.id}>{c.id}</option>)}</select></div>
              </div>
            </div>
            <div className="mo-ft"><button className="btn btn-outline" onClick={()=>setShowAdd(false)}>Cancel</button><button className="btn btn-teal" onClick={addHearing}>Schedule Hearing</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

const InmatesPage = ({ user }) => {
  const [inmates, setInmates] = useState(INIT_INMATES);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name:"", dob:"", cell:"", block:"Block A", charge:"", risk:"LOW", attorney:"" });
  const canManage = canDo(user.role, 7);

  const filtered = inmates.filter(i => {
    const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()) || i.charge.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || i.status === filter;
    return matchSearch && matchFilter;
  });

  const addInmate = () => {
    if (!form.name) return;
    setInmates(p => [...p, { id:`INM-${String(p.length+1).padStart(3,"0")}`, ...form, caseId:null, status:"REMAND", intake:new Date().toISOString().slice(0,10) }]);
    toast("Inmate record created", "success"); setShowAdd(false);
  };

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div><div className="stitle">Detention Registry</div><div className="ssub">Inmate profiles, cell assignments, and custody management</div></div>
        {canManage && <button className="btn btn-teal btn-sm" onClick={()=>setShowAdd(true)}><Ico n="plus" s={13}/>Add Inmate</button>}
      </div>
      <div className="gl"/>

      <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap" }}>
        <input className="inp" style={{ maxWidth:260 }} placeholder="Search name, ID, charge…" value={search} onChange={e=>setSearch(e.target.value)}/>
        {["ALL","REMAND","SENTENCED","RELEASED"].map(s=>(
          <button key={s} className={`btn btn-sm ${filter===s?"btn-teal":"btn-outline"}`} onClick={()=>setFilter(s)}>
            {s} ({s==="ALL"?inmates.length:inmates.filter(i=>i.status===s).length})
          </button>
        ))}
      </div>

      <div className="g4" style={{ marginBottom:16 }}>
        {[{label:"Total Inmates",v:inmates.length,c:""},{label:"On Remand",v:inmates.filter(i=>i.status==="REMAND").length,c:"gold"},{label:"Sentenced",v:inmates.filter(i=>i.status==="SENTENCED").length,c:"red"},{label:"Released",v:inmates.filter(i=>i.status==="RELEASED").length,c:"green"}].map(s=>(
          <div key={s.label} className={`stat-card ${s.c}`}>
            <div className={`stat-v ${s.c}`}>{s.v}</div>
            <div className="stat-l">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gap:9 }}>
        {filtered.map(inm => {
          const lawyer = INIT_LAWYERS.find(l => l.id === inm.attorney);
          return (
            <div key={inm.id} className="card">
              <div className="card-body" style={{ padding:"12px 16px", display:"flex", alignItems:"center", gap:16 }}>
                <div className="av" style={{ width:42, height:42, fontSize:16, flexShrink:0, background:inm.risk==="CRITICAL"?"var(--red-d)":inm.risk==="HIGH"?"rgba(196,154,0,.2)":"var(--navy)" }}>
                  {inm.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ fontWeight:700 }}>{inm.name}</span>
                    {statusBadge(inm.status)}
                    <span className={`badge risk-${inm.risk}`}>{inm.risk} RISK</span>
                  </div>
                  <div className="txs tdim">
                    <span className="mo">{inm.id}</span> · DOB: {inm.dob} · Intake: {inm.intake} · Charge: {inm.charge}
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:12, color:"var(--teal-l)", fontFamily:"'IBM Plex Mono',monospace" }}>{inm.cell}</div>
                  <div className="txs tdim">{inm.block}</div>
                  {lawyer && <div className="txs" style={{ color:"var(--mid)", marginTop:3 }}>Atty: {lawyer.name}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd"><span style={{ fontWeight:700 }}>Register Inmate</span><button className="btn btn-outline btn-xs" onClick={()=>setShowAdd(false)}><Ico n="x" s={13}/></button></div>
            <div className="mo-bd">
              <div className="g2">
                <div className="fg"><label className="lbl">Full Name</label><input className="inp" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Full legal name"/></div>
                <div className="fg"><label className="lbl">Date of Birth</label><input className="inp" type="date" value={form.dob} onChange={e=>setForm(p=>({...p,dob:e.target.value}))}/></div>
              </div>
              <div className="g2">
                <div className="fg"><label className="lbl">Cell Number</label><input className="inp" value={form.cell} onChange={e=>setForm(p=>({...p,cell:e.target.value}))} placeholder="e.g. B-14"/></div>
                <div className="fg"><label className="lbl">Block</label><select className="inp" value={form.block} onChange={e=>setForm(p=>({...p,block:e.target.value}))}><option>Block A (High Security)</option><option>Block B</option><option>Block C</option><option>Block D</option></select></div>
              </div>
              <div className="fg"><label className="lbl">Charge</label><input className="inp" value={form.charge} onChange={e=>setForm(p=>({...p,charge:e.target.value}))} placeholder="Primary charge"/></div>
              <div className="g2">
                <div className="fg"><label className="lbl">Risk Level</label><select className="inp" value={form.risk} onChange={e=>setForm(p=>({...p,risk:e.target.value}))}><option>CRITICAL</option><option>HIGH</option><option>MEDIUM</option><option>LOW</option></select></div>
                <div className="fg"><label className="lbl">Assigned Attorney</label><select className="inp" value={form.attorney} onChange={e=>setForm(p=>({...p,attorney:e.target.value}))}><option value="">None</option>{INIT_LAWYERS.map(l=><option key={l.id} value={l.id}>{l.name}</option>)}</select></div>
              </div>
            </div>
            <div className="mo-ft"><button className="btn btn-outline" onClick={()=>setShowAdd(false)}>Cancel</button><button className="btn btn-teal" onClick={addInmate}>Register Inmate</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

const AnalyticsPage = () => (
  <div className="fade">
    <div style={{ marginBottom:16 }}>
      <div className="stitle">Reporting &amp; Analytics</div>
      <div className="ssub">Operational metrics, case resolution statistics, and system performance</div>
    </div>
    <div className="gl"/>
    <div className="g4" style={{ marginBottom:18 }}>
      {[
        { label:"Total Cases", v:INIT_CASES.length, color:"var(--teal-l)" },
        { label:"Conviction Rate", v:"68%", color:"var(--gold-l)" },
        { label:"Avg Resolution", v:"47 days", color:"#5aabec" },
        { label:"Active Warrants", v:INIT_WARRANTS.filter(w=>w.status==="ACTIVE").length, color:"#e07a6e" },
      ].map(s => (
        <div key={s.label} className="stat-card">
          <div className="stat-v" style={{ color:s.color }}>{s.v}</div>
          <div className="stat-l">{s.label}</div>
        </div>
      ))}
    </div>
    <div className="g2" style={{ marginBottom:18, gap:16 }}>
      <div className="card">
        <div className="card-header"><span className="pf" style={{ fontSize:14 }}>Monthly Cases &amp; Warrants</span></div>
        <div className="card-body" style={{ height:220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ANALYTICS_DATA.monthlyCases} margin={{ top:5, right:10, left:-20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--b1)"/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill:"var(--dim)" }}/>
              <YAxis tick={{ fontSize:10, fill:"var(--dim)" }}/>
              <Tooltip contentStyle={{ background:"var(--panel)", border:"1px solid var(--b2)", borderRadius:"3px", fontSize:12 }}/>
              <Legend wrapperStyle={{ fontSize:11 }}/>
              <Bar dataKey="cases" fill="var(--teal)" name="Cases" radius={[2,2,0,0]}/>
              <Bar dataKey="warrants" fill="var(--gold)" name="Warrants" radius={[2,2,0,0]}/>
              <Bar dataKey="closed" fill="var(--green-l)" name="Closed" radius={[2,2,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="pf" style={{ fontSize:14 }}>Quarterly Resolution Breakdown</span></div>
        <div className="card-body" style={{ height:220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ANALYTICS_DATA.resolutions} margin={{ top:5, right:10, left:-20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--b1)"/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill:"var(--dim)" }}/>
              <YAxis tick={{ fontSize:10, fill:"var(--dim)" }}/>
              <Tooltip contentStyle={{ background:"var(--panel)", border:"1px solid var(--b2)", borderRadius:"3px", fontSize:12 }}/>
              <Legend wrapperStyle={{ fontSize:11 }}/>
              <Bar dataKey="guilty" fill="#e07a6e" name="Guilty" radius={[2,2,0,0]}/>
              <Bar dataKey="notGuilty" fill="#4cd98a" name="Not Guilty" radius={[2,2,0,0]}/>
              <Bar dataKey="dismissed" fill="var(--gold)" name="Dismissed" radius={[2,2,0,0]}/>
              <Bar dataKey="settled" fill="#5aabec" name="Settled" radius={[2,2,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    <div className="g3" style={{ gap:16 }}>
      <div className="card">
        <div className="card-header"><span style={{ fontWeight:600 }}>Case Type Breakdown</span></div>
        <div className="card-body" style={{ height:180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={ANALYTICS_DATA.caseTypes} cx="50%" cy="50%" innerRadius={40} outerRadius={68} paddingAngle={4} dataKey="value">
                {ANALYTICS_DATA.caseTypes.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip contentStyle={{ background:"var(--panel)", border:"1px solid var(--b2)", fontSize:12 }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span style={{ fontWeight:600 }}>Lawyer Performance</span></div>
        <div className="card-body">
          {INIT_LAWYERS.filter(l=>l.status==="ACTIVE").map(l=>(
            <div key={l.id} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                <span>{l.name}</span><span className="mo tg">{l.winRate}%</span>
              </div>
              <div className="pbar"><div className="pbar-fill" style={{ width:`${l.winRate}%` }}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span style={{ fontWeight:600 }}>System Metrics</span></div>
        <div className="card-body">
          {[
            { label:"DB Queries/hr", v:"4,291", bar:68 },
            { label:"API Requests/hr", v:"12,847", bar:82 },
            { label:"Storage Used", v:"2.4 GB", bar:24 },
            { label:"Active Sessions", v:"12", bar:12 },
          ].map(m => (
            <div key={m.label} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                <span className="tmid">{m.label}</span><span className="mo tg">{m.v}</span>
              </div>
              <div className="pbar"><div className="pbar-fill" style={{ width:`${m.bar}%` }}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ChatPage = ({ user }) => {
  const [channel, setChannel] = useState("CH-1");
  const [messages, setMessages] = useState(INIT_MSGS);
  const [input, setInput] = useState("");
  const msgEnd = useRef();

  const send = () => {
    if (!input.trim()) return;
    const msg = { id:`M${Date.now()}`, user:user.username, content:input.trim(), time:new Date().toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"}), role:user.role };
    setMessages(p => ({ ...p, [channel]:[...(p[channel]||[]), msg] }));
    setInput("");
    setTimeout(() => msgEnd.current?.scrollIntoView({ behavior:"smooth" }), 50);
  };

  return (
    <div className="fade">
      <div style={{ marginBottom:16 }}>
        <div className="stitle">Internal Communications</div>
        <div className="ssub">Secure department messaging system</div>
      </div>
      <div className="gl"/>
      <div className="chat-wrap">
        <div className="chat-side">
          <div style={{ padding:"10px 12px", fontSize:11, fontWeight:600, color:"var(--dim)", letterSpacing:"1.2px", textTransform:"uppercase", borderBottom:"1px solid var(--b1)" }}>Channels</div>
          {CHANNELS.map(ch => (
            <div key={ch.id} className={`chat-ch${channel===ch.id?" active":""}`} onClick={()=>setChannel(ch.id)}>
              <span style={{ fontSize:14 }}>{ch.icon}</span>
              <span># {ch.name}</span>
            </div>
          ))}
          <div style={{ padding:"10px 12px", fontSize:11, fontWeight:600, color:"var(--dim)", letterSpacing:"1.2px", textTransform:"uppercase", borderBottom:"1px solid var(--b1)", marginTop:8 }}>Online</div>
          {INIT_USERS.slice(0,4).map(u=>(
            <div key={u.id} style={{ padding:"7px 12px", fontSize:12, display:"flex", alignItems:"center", gap:7 }}>
              <div className="av" style={{ width:22, height:22, fontSize:9 }}>{u.username.slice(0,2).toUpperCase()}</div>
              <span style={{ color:"var(--mid)" }}>{u.username}</span>
            </div>
          ))}
        </div>
        <div className="chat-main" style={{ display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"10px 14px", borderBottom:"1px solid var(--b1)", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontWeight:600 }}>#{CHANNELS.find(c=>c.id===channel)?.name}</span>
            <span style={{ fontSize:11, color:"var(--dim)" }}>Encrypted · DOJ Personnel Only</span>
          </div>
          <div className="chat-msgs" style={{ flex:1 }}>
            {(messages[channel]||[]).map(m => {
              const mine = m.user === user.username;
              return (
                <div key={m.id} className={`msg${mine?" mine":""}`}>
                  {!mine && <div className="av" style={{ width:30, height:30, fontSize:11, flexShrink:0 }}>{m.user.slice(0,2).toUpperCase()}</div>}
                  <div>
                    {!mine && <div style={{ fontSize:10, color:"var(--dim)", marginBottom:3 }}>{m.user} · <span className={`badge bg-${ROLES[m.role]?.color||"gray"}`} style={{ fontSize:"8px" }}>{ROLES[m.role]?.label}</span></div>}
                    <div className={`msg-bub ${mine?"mine":"theirs"}`}>{m.content}</div>
                    <div style={{ fontSize:10, color:"var(--dim)", marginTop:3, textAlign:mine?"right":"left" }}>{m.time}</div>
                  </div>
                </div>
              );
            })}
            {(messages[channel]||[]).length === 0 && <div style={{ textAlign:"center", color:"var(--dim)", fontSize:13, marginTop:40 }}>No messages yet. Start the conversation.</div>}
            <div ref={msgEnd}/>
          </div>
          <div style={{ padding:"10px 12px", borderTop:"1px solid var(--b1)", display:"flex", gap:8 }}>
            <input className="inp" style={{ flex:1 }} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={`Message #${CHANNELS.find(c=>c.id===channel)?.name}…`}/>
            <button className="btn btn-teal btn-sm" onClick={send}><Ico n="chevron_right" s={14}/>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CriminalRecordsPage = ({ user }) => {
  const [search, setSearch] = useState("");
  const canView = hasPerm(user?.role, "CRIMINAL_VIEW");
  if (!canView) return <div className="alrt alrt-red">Access denied. Criminal records require Lawyer authority or higher.</div>;

  const records = CRIMINAL_RECORDS.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fade">
      <div style={{ marginBottom:16 }}>
        <div className="stitle">Criminal Records</div>
        <div className="ssub">Comprehensive criminal history registry</div>
      </div>
      <div className="gl"/>
      <input className="inp" style={{ maxWidth:320, marginBottom:14 }} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or ID…"/>
      <div style={{ display:"grid", gap:13 }}>
        {records.map(r => (
          <div key={r.id} className="card">
            <div className="card-header">
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div className="av" style={{ width:36, height:36, fontSize:13, background:r.riskLevel==="CRITICAL"?"var(--red-d)":"var(--navy)" }}>{r.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                <div>
                  <div style={{ fontWeight:700 }}>{r.name}</div>
                  <div className="txs tdim">DOB: {r.dob} · <span className="mo">{r.id}</span></div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                {riskBadge(r.riskLevel)}
                <span className="txs tdim">SSN: {r.ssn}</span>
              </div>
            </div>
            <div className="card-body">
              <div style={{ overflowX:"auto" }}>
                <table className="tbl">
                  <thead><tr><th>Date</th><th>Charge</th><th>Status</th><th>Case</th></tr></thead>
                  <tbody>
                    {r.offences.map((o,i)=>(
                      <tr key={i}>
                        <td className="tsm">{o.date}</td>
                        <td style={{ fontWeight:500 }}>{o.charge}</td>
                        <td>{statusBadge(o.status)}</td>
                        <td className="mo txs tdim">{o.case}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PleaDealsPage = ({ user }) => {
  if (!hasPerm(user?.role, "PLEA_VIEW")) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,gap:16,padding:32}}>
      <div style={{fontSize:52}}>🔒</div>
      <div style={{fontWeight:700,fontSize:20,color:"var(--teal-l)",letterSpacing:"1px"}}>ACCESS RESTRICTED</div>
      <div style={{color:"var(--dim)",fontSize:13,textAlign:"center",maxWidth:400,lineHeight:1.8}}>
        This section is restricted to verified DOJ personnel only. Your role
        (<strong style={{color:"var(--gold-l)"}}>{ROLES[user?.role]?.label||user?.role||"None"}</strong>) does not have the required permissions.
      </div>
      <div style={{fontSize:11,color:"var(--dim)",background:"var(--surf)",border:"1px solid var(--b1)",padding:"8px 18px",borderRadius:"var(--radius)",fontFamily:"'IBM Plex Mono',monospace"}}>
        ERR_ACCESS_DENIED · {user?.role||"UNAUTHENTICATED"} · {new Date().toISOString().slice(0,19)}Z
      </div>
    </div>
  );
  const [deals, setDeals] = useState(PLEA_DEALS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ caseId:"", defendant:"", originalCharge:"", proposedCharge:"", sentence:"" });
  const canCreate = hasPerm(user?.role, "PLEA_MANAGE");

  const addDeal = () => {
    if (!form.defendant) return;
    setDeals(p => [...p, { id:`PD-${String(p.length+1).padStart(3,"0")}`, ...form, status:"PENDING", offeredBy:user.username, date:new Date().toISOString().slice(0,10) }]);
    toast("Plea deal submitted for review", "success"); setShowAdd(false);
  };

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div><div className="stitle">Plea Deals <span style={{ fontSize:11, background:"var(--teal-d)", color:"var(--teal-l)", padding:"2px 6px", borderRadius:2 }}>NEW</span></div><div className="ssub">Plea bargain negotiations and agreements</div></div>
        {canCreate && <button className="btn btn-teal btn-sm" onClick={()=>setShowAdd(true)}><Ico n="plus" s={13}/>New Plea Deal</button>}
      </div>
      <div className="gl"/>
      <div style={{ display:"grid", gap:11 }}>
        {deals.map(d=>(
          <div key={d.id} className="card">
            <div className="card-body" style={{ padding:"13px 16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                    <span style={{ fontWeight:700 }}>{d.defendant}</span>
                    {statusBadge(d.status)}
                  </div>
                  <div className="txs tdim" style={{ marginBottom:8 }}><span className="mo">{d.id}</span> · Case: <span className="mo">{d.caseId}</span> · {d.date} · Offered by: {d.offeredBy}</div>
                  <div className="g2" style={{ gap:10 }}>
                    <div><div className="lbl" style={{ fontSize:9 }}>Original Charge</div><div className="tsm tred">{d.originalCharge}</div></div>
                    <div><div className="lbl" style={{ fontSize:9 }}>Proposed Charge</div><div className="tsm tgreen">{d.proposedCharge}</div></div>
                    <div><div className="lbl" style={{ fontSize:9 }}>Proposed Sentence</div><div className="tsm">{d.sentence}</div></div>
                  </div>
                </div>
                {canDo(user.role, 7) && d.status === "PENDING" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                    <button className="btn btn-green btn-xs" onClick={()=>{setDeals(p=>p.map(x=>x.id===d.id?{...x,status:"ACCEPTED"}:x));toast("Plea deal accepted","success");}}>Accept</button>
                    <button className="btn btn-red btn-xs" onClick={()=>{setDeals(p=>p.map(x=>x.id===d.id?{...x,status:"REJECTED"}:x));toast("Plea deal rejected","warn");}}>Reject</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showAdd && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd"><span style={{ fontWeight:700 }}>Submit Plea Deal</span><button className="btn btn-outline btn-xs" onClick={()=>setShowAdd(false)}><Ico n="x" s={13}/></button></div>
            <div className="mo-bd">
              <div className="g2">
                <div className="fg"><label className="lbl">Defendant Name</label><input className="inp" value={form.defendant} onChange={e=>setForm(p=>({...p,defendant:e.target.value}))} placeholder="Full name"/></div>
                <div className="fg"><label className="lbl">Linked Case</label><select className="inp" value={form.caseId} onChange={e=>setForm(p=>({...p,caseId:e.target.value}))}><option value="">None</option>{INIT_CASES.map(c=><option key={c.id} value={c.id}>{c.id}</option>)}</select></div>
              </div>
              <div className="fg"><label className="lbl">Original Charge</label><input className="inp" value={form.originalCharge} onChange={e=>setForm(p=>({...p,originalCharge:e.target.value}))} placeholder="Current charge(s)"/></div>
              <div className="fg"><label className="lbl">Proposed Reduced Charge</label><input className="inp" value={form.proposedCharge} onChange={e=>setForm(p=>({...p,proposedCharge:e.target.value}))} placeholder="Plea to lesser charge"/></div>
              <div className="fg"><label className="lbl">Proposed Sentence</label><input className="inp" value={form.sentence} onChange={e=>setForm(p=>({...p,sentence:e.target.value}))} placeholder="e.g. 2yrs probation, fine, community service"/></div>
            </div>
            <div className="mo-ft"><button className="btn btn-outline" onClick={()=>setShowAdd(false)}>Cancel</button><button className="btn btn-teal" onClick={addDeal}>Submit Deal</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

const BarPage = ({ user, auditLog, audit }) => {
  const [lawyers, setLawyers] = useState(INIT_LAWYERS);
  const [barMembers, setBarMembers] = useState(
    INIT_USERS.filter(u => ["BAR_HEAD","BAR_SUPERVISOR","BAR_MEMBER"].includes(u.role))
  );
  const [applications, setApplications] = useState([
    { id:"APP-001", name:"Priya Nair",   email:"p.nair@email.com",  spec:"Public Defense", submitted:"2025-06-01", status:"PENDING",  quals:"LLB, 1yr internship" },
    { id:"APP-002", name:"Connor Walsh", email:"c.walsh@email.com", spec:"Criminal Law",   submitted:"2025-07-10", status:"APPROVED", quals:"JD, 2yr firm experience" },
    { id:"APP-003", name:"Mei Lin",      email:"m.lin@email.com",   spec:"Corporate Law",  submitted:"2025-08-01", status:"REJECTED", quals:"LLB" },
  ]);
  const [tab, setTab] = useState("members");
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberForm, setMemberForm] = useState({ username:"", charName:"", citizenId:"", role:"BAR_MEMBER", email:"", password:"bar123", notes:"" });
  const canManage = hasPerm(user.role, "BAR_MANAGE");
  const canLicense = hasPerm(user.role, "BAR_LICENSE");

  if (!hasPerm(user.role, "BAR_VIEW")) return (
    <div className="alrt alrt-red">Access restricted. Bar Association access requires Head Lawyer clearance or above.</div>
  );

  const addMember = () => {
    if (!memberForm.username || !memberForm.charName) { toast("Username and character name required","error"); return; }
    const exists = INIT_USERS.find(u => u.username === memberForm.username);
    if (exists) {
      const updated = INIT_USERS.map(u => u.username === memberForm.username ? {...u, role: memberForm.role, section:"BAR"} : u);
      INIT_USERS.splice(0, INIT_USERS.length, ...updated);
      setBarMembers(INIT_USERS.filter(u => ["BAR_HEAD","BAR_SUPERVISOR","BAR_MEMBER"].includes(u.role)));
      toast(`${exists.charName||memberForm.username} moved to Bar Association as ${ROLES[memberForm.role]?.label}`, "success");
    } else {
      const nu = {
        id:"USR-BA"+Date.now(), username:memberForm.username, password:memberForm.password||"bar123",
        role:memberForm.role, email:memberForm.email||memberForm.username+"@bar.gov",
        discordId:memberForm.username, active:true, joined:new Date().toISOString().slice(0,10),
        phone:"", bio:memberForm.notes||ROLES[memberForm.role]?.label,
        citizenId:memberForm.citizenId, charName:memberForm.charName,
        points:0, section:"BAR", badge:true,
      };
      INIT_USERS.push(nu);
      setBarMembers(p => [...p, nu]);
      toast(`${memberForm.charName} added to Bar Association as ${ROLES[memberForm.role]?.label}`, "success");
    }
    setShowAddMember(false);
    setMemberForm({ username:"", charName:"", citizenId:"", role:"BAR_MEMBER", email:"", password:"bar123", notes:"" });
  };

  const liveMembers = INIT_USERS.filter(u => ["BAR_HEAD","BAR_SUPERVISOR","BAR_MEMBER"].includes(u.role));

  return (
    <div className="fade">
      {}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div className="stitle">Bar Association</div>
          <div className="ssub">Lawyer licensing, membership, regulation, and professional conduct</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {canManage && (
            <button className="btn btn-teal btn-sm" onClick={()=>setShowAddMember(true)}>
              <Ico n="plus" s={13}/> Add BA Member
            </button>
          )}
        </div>
      </div>
      <div className="gl"/>

      {}
      <div className="g4" style={{ marginBottom:16 }}>
        {[
          { l:"BA Members",      v:liveMembers.length,                                       c:"teal" },
          { l:"Active Licenses", v:lawyers.filter(x=>x.status==="ACTIVE").length,            c:"teal" },
          { l:"Suspended",       v:lawyers.filter(x=>x.status==="SUSPENDED").length,         c:"red"  },
          { l:"Pending Apps",    v:applications.filter(x=>x.status==="PENDING").length,      c:"gold" },
        ].map(s=>(
          <div key={s.l} className={`stat-card ${s.c}`}>
            <div className={`stat-v ${s.c}`}>{s.v}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {}
      <div className="tabs" style={{ marginBottom:14 }}>
        {[["members","BA Members"],["licenses","Licensed Practitioners"],["applications","Applications"]].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?" active":""}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      {}
      {tab === "members" && (
        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight:600 }}>Bar Association Personnel</span>
            <span className="badge bg-teal">{liveMembers.length} members</span>
          </div>
          {liveMembers.length === 0 ? (
            <div style={{ padding:32, textAlign:"center", color:"var(--dim)", fontSize:13 }}>
              No Bar Association members registered yet.
              {canManage && <div style={{ marginTop:8 }}><button className="btn btn-teal btn-sm" onClick={()=>setShowAddMember(true)}>+ Add First Member</button></div>}
            </div>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table className="tbl">
                <thead><tr><th>Discord</th><th>Character Name</th><th>Role</th><th>Citizen ID</th><th>Joined</th><th>Section</th><th>Status</th>{canManage&&<th>Actions</th>}</tr></thead>
                <tbody>
                  {liveMembers.map(m=>(
                    <tr key={m.id}>
                      <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{m.username}</span></td>
                      <td style={{ fontWeight:600 }}>{m.charName||"—"}</td>
                      <td>
                        <span className={`badge bg-${m.role==="BAR_HEAD"?"gold":m.role==="BAR_SUPERVISOR"?"teal":"blue"}`}>
                          {ROLES[m.role]?.label}
                        </span>
                      </td>
                      <td><span className="mo tsm tdim">{m.citizenId||"—"}</span></td>
                      <td className="tsm tdim">{m.joined}</td>
                      <td><span className="tag">{m.section||"BAR"}</span></td>
                      <td>{m.active ? <span className="badge bg-green">ACTIVE</span> : <span className="badge bg-red">INACTIVE</span>}</td>
                      {canManage && (
                        <td>
                          {m.role !== "BAR_HEAD" && (
                            <select className="inp" style={{ width:"auto", fontSize:11, padding:"3px 6px" }}
                              value={m.role}
                              onChange={e => {
                                const newRole = e.target.value;
                                const updated = INIT_USERS.map(u => u.id===m.id ? {...u, role:newRole} : u);
                                INIT_USERS.splice(0, INIT_USERS.length, ...updated);
                                setBarMembers(INIT_USERS.filter(u=>["BAR_HEAD","BAR_SUPERVISOR","BAR_MEMBER"].includes(u.role)));
                                toast(`${m.charName||m.username} role updated to ${ROLES[newRole]?.label}`, "success");
                              }}>
                              <option value="BAR_HEAD">Head of BA</option>
                              <option value="BAR_SUPERVISOR">BA Supervisor</option>
                              <option value="BAR_MEMBER">BA Member</option>
                            </select>
                          )}
                          {m.role === "BAR_HEAD" && <span className="tsm tdim">Head — cannot reassign</span>}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {}
      {tab === "licenses" && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600 }}>Licensed Practitioners</span><span className="badge bg-teal">{lawyers.filter(x=>x.status==="ACTIVE").length} active</span></div>
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead><tr><th>Badge</th><th>Name</th><th>Rank</th><th>Specialization</th><th>Cases</th><th>Win%</th><th>Status</th><th>Expires</th>{canManage&&<th>Actions</th>}</tr></thead>
              <tbody>
                {lawyers.map(l=>(
                  <tr key={l.id}>
                    <td className="mo txs tdim">{l.badge}</td>
                    <td style={{ fontWeight:600 }}>{l.name}</td>
                    <td><span className="tag">{l.rank.replace(/_/g," ")}</span></td>
                    <td className="tsm">{l.spec}</td>
                    <td className="mo tsm">{l.cases}</td>
                    <td><span style={{ color:l.winRate>80?"#4cd98a":l.winRate>60?"var(--gold-l)":"#e07a6e", fontFamily:"'IBM Plex Mono',monospace", fontSize:12 }}>{l.winRate}%</span></td>
                    <td>{statusBadge(l.status)}</td>
                    <td className="tsm tdim">{l.expires||"N/A"}</td>
                    {canManage && (
                      <td>
                        {l.status==="ACTIVE"&&<button className="btn btn-xs" style={{ background:"rgba(224,122,110,.15)",color:"#e07a6e",border:"1px solid rgba(224,122,110,.3)" }} onClick={()=>{setLawyers(p=>p.map(x=>x.id===l.id?{...x,status:"SUSPENDED"}:x));toast(`${l.name} suspended`,"warn");}}>Suspend</button>}
                        {l.status==="SUSPENDED"&&<button className="btn btn-xs btn-teal" onClick={()=>{setLawyers(p=>p.map(x=>x.id===l.id?{...x,status:"ACTIVE"}:x));toast(`${l.name} reinstated`,"success");}}>Reinstate</button>}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {}
      {tab === "applications" && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600 }}>License Applications</span><span className="badge bg-gold">{applications.filter(a=>a.status==="PENDING").length} pending</span></div>
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead><tr><th>ID</th><th>Applicant</th><th>Specialization</th><th>Qualifications</th><th>Submitted</th><th>Status</th>{canManage&&<th>Actions</th>}</tr></thead>
              <tbody>
                {applications.map(a=>(
                  <tr key={a.id}>
                    <td className="mo txs tdim">{a.id}</td>
                    <td><div style={{ fontWeight:600 }}>{a.name}</div><div className="txs tdim">{a.email}</div></td>
                    <td>{a.spec}</td>
                    <td className="tsm">{a.quals}</td>
                    <td className="tsm tdim">{a.submitted}</td>
                    <td>{statusBadge(a.status)}</td>
                    {canManage && a.status==="PENDING" && (
                      <td style={{ display:"flex", gap:5 }}>
                        <button className="btn btn-xs btn-teal" onClick={()=>{setApplications(p=>p.map(x=>x.id===a.id?{...x,status:"APPROVED"}:x));toast("Application approved","success");}}>Approve</button>
                        <button className="btn btn-xs" style={{ background:"rgba(224,122,110,.15)",color:"#e07a6e",border:"1px solid rgba(224,122,110,.3)" }} onClick={()=>{setApplications(p=>p.map(x=>x.id===a.id?{...x,status:"REJECTED"}:x));toast("Application rejected","warn");}}>Reject</button>
                      </td>
                    )}
                    {canManage && a.status !== "PENDING" && <td/>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {}
      {showAddMember && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700, fontSize:15 }}>Add Bar Association Member</div>
                <div className="tsm tdim">Assign an existing DOJ staff member, or register a new BA-only account</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setShowAddMember(false)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              {}
              <div style={{ background:"rgba(26,122,122,.06)", border:"1px solid rgba(26,122,122,.2)", borderRadius:"var(--radius)", padding:"12px 14px", marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:600, color:"var(--teal-l)", textTransform:"uppercase", letterSpacing:"1px", marginBottom:8 }}>Quick Assign — Existing DOJ Staff</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {INIT_USERS.filter(u=>u.active && !["BAR_HEAD","BAR_SUPERVISOR","BAR_MEMBER","ADMIN","CITIZEN"].includes(u.role)).map(u=>(
                    <button key={u.id} className="btn btn-outline btn-xs"
                      style={{ fontSize:11 }}
                      onClick={()=>setMemberForm(p=>({...p, username:u.username, charName:u.charName||u.username, citizenId:u.citizenId||"" }))}>
                      {u.charName||u.username} <span className="tdim">({ROLES[u.role]?.label})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="g2" style={{ gap:12 }}>
                <div className="fg">
                  <label className="lbl">BA Role *</label>
                  <select className="inp" value={memberForm.role} onChange={e=>setMemberForm(p=>({...p,role:e.target.value}))}>
                    <option value="BAR_MEMBER">Bar Association Member</option>
                    <option value="BAR_SUPERVISOR">Bar Association Supervisor</option>
                    <option value="BAR_HEAD">Head of Bar Association</option>
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Discord / Username *</label>
                  <input className="inp" value={memberForm.username} onChange={e=>setMemberForm(p=>({...p,username:e.target.value}))} placeholder="e.g. sultan13579"/>
                </div>
              </div>
              <div className="g2" style={{ gap:12 }}>
                <div className="fg">
                  <label className="lbl">Character Name *</label>
                  <input className="inp" value={memberForm.charName} onChange={e=>setMemberForm(p=>({...p,charName:e.target.value}))} placeholder="Full in-game name"/>
                </div>
                <div className="fg">
                  <label className="lbl">Citizen ID</label>
                  <input className="inp" value={memberForm.citizenId} onChange={e=>setMemberForm(p=>({...p,citizenId:e.target.value}))} placeholder="e.g. IZN54524"/>
                </div>
              </div>
              <div className="g2" style={{ gap:12 }}>
                <div className="fg">
                  <label className="lbl">Email (optional)</label>
                  <input className="inp" value={memberForm.email} onChange={e=>setMemberForm(p=>({...p,email:e.target.value}))} placeholder="name@bar.gov"/>
                </div>
                <div className="fg">
                  <label className="lbl">Password (if new account)</label>
                  <input className="inp" value={memberForm.password} onChange={e=>setMemberForm(p=>({...p,password:e.target.value}))} placeholder="Default: bar123"/>
                </div>
              </div>
              <div className="fg">
                <label className="lbl">Notes</label>
                <input className="inp" value={memberForm.notes} onChange={e=>setMemberForm(p=>({...p,notes:e.target.value}))} placeholder="Role notes or reason for appointment…"/>
              </div>
              <div className="alrt alrt-teal" style={{ marginTop:4 }}>
                If the username already exists in the system, their role will be <strong>updated</strong> to the selected BA role. Otherwise a new account is created.
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowAddMember(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={addMember}><Ico n="plus" s={13}/>Add to Bar Association</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminPage = ({ user, allUsers, setAllUsers, auditLog, audit }) => {
  const [tab, setTab] = useState("users");
  if (!canDo(user.role, 8)) return <div className="alrt alrt-red">Access denied. Admin panel requires Deputy Chief authority or higher.</div>;

  return (
    <div className="fade">
      <div style={{ marginBottom:16 }}>
        <div className="stitle">Administration Panel</div>
        <div className="ssub">Restricted · Authorized personnel only · All actions logged</div>
      </div>
      <div className="gl"/>
      <div className="alrt alrt-gold" style={{ marginBottom:16 }}>⚠ All administrative actions are permanently logged and audited.</div>
      <div className="tabs">
        {["users","system","audit"].map(t => <div key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize" }}>{t}</div>)}
      </div>
      {tab==="users" && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600 }}>User Management</span><span className="badge bg-teal">{allUsers.length} Users</span></div>
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Discord</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
              <tbody>
                {allUsers.map(u=>(
                  <tr key={u.id}>
                    <td className="mo txs tdim">{u.id}</td>
                    <td style={{ fontWeight:600 }}>{u.username}</td>
                    <td className="tsm tdim">{u.email}</td>
                    <td>
                      <select className="inp" style={{ padding:"2px 6px", fontSize:11, width:"auto" }} value={u.role} onChange={e=>{setAllUsers(p=>p.map(x=>x.id===u.id?{...x,role:e.target.value}:x));toast("Role updated","success");}}>
                        {Object.keys(ROLES).map(r=><option key={r} value={r}>{ROLES[r].label}</option>)}
                      </select>
                    </td>
                    <td><span className={`badge bg-${u.discordId?"blue":"gray"}`}>{u.discordId?"Linked":"None"}</span></td>
                    <td><span className={`badge bg-${u.active?"green":"red"}`}>{u.active?"Active":"Suspended"}</span></td>
                    <td className="tsm tdim">{u.joined}</td>
                    <td>
                      {u.id !== user.id && <button className={`btn btn-xs ${u.active?"btn-red":"btn-blue"}`} onClick={()=>{setAllUsers(p=>p.map(x=>x.id===u.id?{...x,active:!x.active}:x));toast(`User ${u.active?"suspended":"restored"}`,"warn");}}>{u.active?"Suspend":"Restore"}</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab==="system" && (
        <div className="g3" style={{ gap:14 }}>
          {[
            { title:"Authentication",   detail:"JWT + Discord OAuth · Active",           ok:true, icon:"lock" },
            { title:"Case Database",    detail:`${INIT_CASES.length} records indexed`,   ok:true, icon:"briefcase" },
            { title:"Evidence Vault",   detail:`${INIT_EVIDENCE.length} items secured`,  ok:true, icon:"fingerprint" },
            { title:"Warrant Registry", detail:`${INIT_WARRANTS.length} warrants on file`,ok:true, icon:"shield" },
            { title:"RBAC Engine",      detail:`${Object.keys(ROLES).length} roles configured`, ok:true, icon:"star" },
            { title:"Audit Logger",     detail:"All actions timestamped",                ok:true, icon:"activity" },
          ].map(s=>(
            <div key={s.title} className="card">
              <div className="card-body" style={{ display:"flex", gap:13, alignItems:"center" }}>
                <div style={{ width:38, height:38, background:"rgba(26,122,74,.12)", border:"1px solid rgba(26,122,74,.3)", borderRadius:"var(--radius)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Ico n={s.icon} s={16} c="#4cd98a"/>
                </div>
                <div>
                  <div style={{ fontWeight:600, marginBottom:2 }}>{s.title}</div>
                  <div className="txs tdim">{s.detail}</div>
                  <span className="badge bg-green" style={{ marginTop:5 }}>ONLINE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab==="audit" && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600 }}>Audit Log</span></div>
          <div className="card-body">
            {[
              { t:"2026-03-03 09:12", u:"chief.harrison", a:"Issued Warrant WRT-2025-003",                lvl:"WARN" },
              { t:"2026-03-03 08:45", u:"admin.wilson",   a:"Changed role of atty.walker to SENIOR_LAWYER",lvl:"WARN" },
              { t:"2026-03-02 17:30", u:"atty.reeves",    a:"Uploaded Evidence EVD-004",                  lvl:"INFO" },
              { t:"2026-03-02 14:00", u:"dep.santos",     a:"Case CASE-2025-0041 moved to IN_COURT",       lvl:"INFO" },
              { t:"2026-03-01 11:20", u:"chief.harrison", a:"Suspended lawyer LIC-0003",                  lvl:"WARN" },
              { t:"2026-02-28 09:00", u:"System",         a:"All modules online. System startup.",         lvl:"INFO" },
            ].map((log,i)=>(
              <div key={i} style={{ display:"flex", gap:13, alignItems:"flex-start", padding:"9px 0", borderBottom:i<5?"1px solid var(--b1)":"none" }}>
                <span className={`badge bg-${log.lvl==="WARN"?"yellow":"gray"}`}>{log.lvl}</span>
                <div style={{ flex:1 }}>
                  <div className="tsm">{log.a}</div>
                  <div className="txs tdim" style={{ marginTop:2 }}>{log.t} · {log.u}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProfilePage = ({ user, allUsers, setAllUsers }) => {
  const [form, setForm] = useState({ ...user });
  const [tab, setTab] = useState("profile");
  const [twoFA, setTwoFA] = useState(false);
  const [otp, setOtp] = useState(["","","","","",""]);
  const otpRefs = useRef([]);

  const save = () => {
    setAllUsers(p => p.map(u => u.id === user.id ? { ...u, ...form } : u));
    toast("Profile updated", "success");
  };

  const activity = [
    { action:"Logged in via Discord",        time:"Today 08:12",       type:"auth" },
    { action:"Viewed CASE-2025-0041",         time:"Today 09:30",       type:"case" },
    { action:"Uploaded evidence EVD-004",     time:"Yesterday 15:20",   type:"evidence" },
    { action:"Sent message in #general",      time:"Yesterday 08:15",   type:"chat" },
    { action:"Updated case status to IN_COURT",time:"3 days ago 11:00", type:"case" },
    { action:"Logged in from 192.168.1.44",   time:"3 days ago 08:00",  type:"auth" },
  ];

  return (
    <div className="fade">
      <div style={{ marginBottom:16 }}>
        <div className="stitle">My Profile</div>
        <div className="ssub">Account settings, security, and activity log</div>
      </div>
      <div className="gl"/>
      <div className="tabs">
        {["profile","security","activity"].map(t=><div key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize" }}>{t}</div>)}
      </div>

      {tab==="profile" && (
        <div className="g2" style={{ gap:16 }}>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight:600 }}>Personal Information</span></div>
            <div className="card-body">
              <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:18 }}>
                <div className="av" style={{ width:56, height:56, fontSize:20 }}>{user.username.slice(0,2).toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:15 }}>{user.username}</div>
                  <span className={`badge bg-${ROLES[user.role]?.color||"gray"}`}>{ROLES[user.role]?.label}</span>
                  {user.discordId && <span className="badge bg-blue" style={{ marginLeft:6 }}>Discord Linked</span>}
                  {user.discordVerified && <span className="badge" style={{ marginLeft:4, background:"#5865F2", color:"#fff" }}>✓ Discord Verified</span>}
                  {user.authMethod === "discord" && <span className="badge bg-green" style={{ marginLeft:4, fontSize:"9px" }}>OAuth Session</span>}
                </div>
              </div>
              <div className="fg"><label className="lbl">Username</label><input className="inp" value={form.username} onChange={e=>setForm(p=>({...p,username:e.target.value}))}/></div>
              <div className="fg"><label className="lbl">Email</label><input className="inp" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}/></div>
              <div className="fg"><label className="lbl">Phone</label><input className="inp" value={form.phone||""} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="+1 555-0000"/></div>
              <div className="fg"><label className="lbl">Bio</label><textarea className="inp" value={form.bio||""} onChange={e=>setForm(p=>({...p,bio:e.target.value}))}/></div>
              <button className="btn btn-teal" onClick={save}><Ico n="check" s={13}/>Save Changes</button>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight:600 }}>Account Details</span></div>
            <div className="card-body">
              <div style={{ display:"grid", gap:10 }}>
                {[
                  ["User ID", user.id],
                  ["Role", ROLES[user.role]?.label],
                  ["Joined", user.joined],
                  ["Discord", user.discordId || "Not linked"],
                  ["Account Status", "Active"],
                  ["Last Login", "Today 08:12"],
                ].map(([l,v])=>(
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid var(--b1)" }}>
                    <span className="tsm tdim">{l}</span>
                    <span className="tsm mo">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab==="security" && (
        <div className="g2" style={{ gap:16 }}>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight:600 }}>Change Password</span></div>
            <div className="card-body">
              <div className="fg"><label className="lbl">Current Password</label><input className="inp" type="password" placeholder="••••••••"/></div>
              <div className="fg"><label className="lbl">New Password</label><input className="inp" type="password" placeholder="••••••••"/></div>
              <div className="fg"><label className="lbl">Confirm Password</label><input className="inp" type="password" placeholder="••••••••"/></div>
              <button className="btn btn-teal btn-sm" onClick={()=>toast("Password updated","success")}>Update Password</button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <span style={{ fontWeight:600 }}>Two-Factor Authentication</span>
              <span className={`badge bg-${twoFA?"green":"gray"}`}>{twoFA?"ENABLED":"DISABLED"}</span>
            </div>
            <div className="card-body">
              {!twoFA ? (
                <div>
                  <div className="alrt alrt-teal" style={{ marginBottom:14 }}>Enable 2FA to add an extra layer of security to your account.</div>
                  <div style={{ textAlign:"center", margin:"16px 0" }}>
                    <div style={{ width:140, height:140, background:"var(--surf)", border:"2px solid var(--b2)", borderRadius:4, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"var(--dim)" }}>
                      [QR Code Simulated]<br/>Scan with authenticator app
                    </div>
                    <div className="txs tdim" style={{ marginTop:8 }}>Or enter: <span className="mo" style={{ color:"var(--teal-l)" }}>JBSWY3DPEHPK3PXP</span></div>
                  </div>
                  <div className="lbl" style={{ textAlign:"center", marginBottom:4 }}>Enter 6-digit verification code</div>
                  <div className="otp-wrap">
                    {otp.map((v,i)=>(
                      <input key={i} ref={el=>otpRefs.current[i]=el} className="otp-inp" maxLength={1} value={v} onChange={e=>{const nv=[...otp];nv[i]=e.target.value;setOtp(nv);if(e.target.value&&i<5)otpRefs.current[i+1]?.focus();}} onKeyDown={e=>{if(e.key==="Backspace"&&!v&&i>0)otpRefs.current[i-1]?.focus();}}/>
                    ))}
                  </div>
                  <button className="btn btn-teal w-full" style={{ width:"100%", justifyContent:"center", marginTop:8 }} onClick={()=>{setTwoFA(true);setOtp(["","","","","",""]);toast("2FA enabled successfully","success");}}>
                    <Ico n="lock" s={13}/>Enable 2FA
                  </button>
                </div>
              ) : (
                <div>
                  <div className="alrt alrt-green">Two-factor authentication is active on your account.</div>
                  <button className="btn btn-red btn-sm" style={{ marginTop:8 }} onClick={()=>{setTwoFA(false);toast("2FA disabled","warn");}}>Disable 2FA</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tab==="activity" && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600 }}>Activity Log</span><span className="badge bg-gray">{activity.length} entries</span></div>
          <div className="card-body">
            {activity.map((a,i)=>(
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"9px 0", borderBottom:i<activity.length-1?"1px solid var(--b1)":"none" }}>
                <div style={{ width:28, height:28, borderRadius:"var(--radius)", background:"rgba(26,122,122,.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Ico n={a.type==="auth"?"lock":a.type==="case"?"briefcase":a.type==="evidence"?"fingerprint":"chat"} s={13} c="var(--teal-l)"/>
                </div>
                <div style={{ flex:1 }}>
                  <div className="tsm">{a.action}</div>
                  <div className="txs tdim" style={{ marginTop:2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PublicLookup = ({ onLogin }) => {
  const [q, setQ] = useState("");
  const [results, setResults] = useState(null);

  const search = () => {
    if (!q.trim()) return;
    const r = INIT_CASES.filter(c => c.id.toLowerCase().includes(q.toLowerCase()) || c.title.toLowerCase().includes(q.toLowerCase()) || c.defendant.toLowerCase().includes(q.toLowerCase()));
    setResults(r);
  };

  return (
    <div className="pub-wrap">
      <div style={{ width:"100%", maxWidth:600 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <img src={SEAL_B64} alt="DOJ" style={{ width:90, height:90, objectFit:"contain", filter:"drop-shadow(0 0 18px rgba(26,122,122,.5))" }}/>
          <div className="pf" style={{ fontSize:26, marginTop:14, color:"var(--teal-l)", letterSpacing:"2px" }}>DEPARTMENT OF JUSTICE</div>
          <div style={{ fontSize:12, color:"var(--dim)", letterSpacing:"3px", marginTop:4 }}>PUBLIC CASE REGISTRY</div>
          <div style={{ width:60, height:2, background:"var(--teal)", margin:"14px auto 0" }}/>
        </div>
        <div style={{ background:"var(--panel)", border:"1px solid var(--b2)", borderRadius:5, padding:28, marginBottom:16 }}>
          <div style={{ fontSize:13, color:"var(--mid)", marginBottom:14 }}>Search for publicly available case information by Case ID, defendant name, or case title.</div>
          <div style={{ display:"flex", gap:8 }}>
            <input className="inp" style={{ flex:1 }} value={q} onChange={e=>setQ(e.target.value)} placeholder="Enter Case ID or name…" onKeyDown={e=>e.key==="Enter"&&search()}/>
            <button className="btn btn-teal" onClick={search}><Ico n="search" s={13}/>Search</button>
          </div>
          {results !== null && (
            <div style={{ marginTop:16 }}>
              {results.length === 0 ? (
                <div style={{ textAlign:"center", color:"var(--dim)", fontSize:13, padding:16 }}>No public records found for "{q}"</div>
              ) : results.map(c=>(
                <div key={c.id} style={{ background:"var(--card)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", padding:14, marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                    <div style={{ fontWeight:700 }}>{c.title}</div>
                    {statusBadge(c.status)}
                  </div>
                  <div className="txs tdim" style={{ marginBottom:8 }}>Case ID: <span className="mo">{c.id}</span> · Filed: {c.filed} · Type: {c.type}</div>
                  <div className="tsm tmid">{c.desc}</div>
                  <div style={{ marginTop:8, fontSize:11, color:"var(--dim)" }}>⚠ Sensitive case details are redacted for privacy. Contact the DOJ for full records.</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ textAlign:"center" }}>
          <button className="btn btn-outline btn-sm" onClick={onLogin}><Ico n="lock" s={13}/>Staff Login Portal</button>
          <div style={{ fontSize:11, color:"var(--dim)", marginTop:8 }}>Authorized personnel: use secure login</div>
        </div>
      </div>
    </div>
  );
};

const SimplePage = ({ title, sub, children }) => (
  <div className="fade">
    <div className="stitle">{title}</div>
    <div className="ssub">{sub}</div>
    <div className="gl"/>
    {children}
  </div>
);

const INIT_DOCUMENTS = []; // Cleared 2026-03-05T20:00:00.000Z — 5 AI/demo entries removed by admin cleanup

const DocumentsPage = ({ user, allUsers, cases, auditLog, setAuditLog, audit }) => {
  if (!hasPerm(user?.role, "DOC_VIEW")) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,gap:16,padding:32}}>
      <div style={{fontSize:52}}>🔒</div>
      <div style={{fontWeight:700,fontSize:20,color:"var(--teal-l)",letterSpacing:"1px"}}>ACCESS RESTRICTED</div>
      <div style={{color:"var(--dim)",fontSize:13,textAlign:"center",maxWidth:400,lineHeight:1.8}}>
        This section is restricted to verified DOJ personnel only. Your role
        (<strong style={{color:"var(--gold-l)"}}>{ROLES[user?.role]?.label||user?.role||"None"}</strong>) does not have the required permissions.
      </div>
      <div style={{fontSize:11,color:"var(--dim)",background:"var(--surf)",border:"1px solid var(--b1)",padding:"8px 18px",borderRadius:"var(--radius)",fontFamily:"'IBM Plex Mono',monospace"}}>
        ERR_ACCESS_DENIED · {user?.role||"UNAUTHENTICATED"} · {new Date().toISOString().slice(0,19)}Z
      </div>
    </div>
  );
  const [docs, setDocs] = useState(INIT_DOCUMENTS);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [showAdd, setShowAdd] = useState(false);
  const [editDoc, setEditDoc] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm] = useState({ name:"", caseId:"", type:"MOTION", desc:"", classification:"STANDARD" });

  const canAdd    = hasPerm(user.role, "BAR_MANAGE") || canDo(user.role, 7);
  const canEdit   = hasPerm(user.role, "BAR_MANAGE") || canDo(user.role, 7);
  const canDelete = canDo(user.role, 8); // Chief+ only can delete

  const DOC_TYPES = ["MOTION","AFFIDAVIT","INDICTMENT","AGREEMENT","WARRANT","BRIEF","ORDER","SUBPOENA","EXHIBIT","REPORT","CORRESPONDENCE","OTHER"];
  const CLASSIFICATIONS = ["STANDARD","CONFIDENTIAL","RESTRICTED","TOP SECRET"];

  const docAudit = (action, doc, severity="MEDIUM") => {
    if (audit) audit(action, doc.name + " [" + doc.type + "]", doc.id, severity);
    else if (setAuditLog) setAuditLog(p => [{
      id:"AUD"+Date.now(), ts:new Date().toISOString(),
      actor:user.username, action, detail:doc.name + " (" + doc.type + ")",
      ref:doc.id, type:"document",
      ip:"10.0.0."+Math.floor(Math.random()*254+1), severity
    }, ...p.slice(0,499)]);
  };

  const addDoc = () => {
    if (!form.name || !form.type) { toast("Document name and type are required", "error"); return; }
    const nd = {
      id: "DOC-" + String(Date.now()).slice(-6),
      name: form.name, caseId: form.caseId, type: form.type,
      desc: form.desc, classification: form.classification || "STANDARD",
      by: user.username, date: new Date().toISOString().slice(0,10),
      size: Math.floor(Math.random()*400+50) + " KB",
      addedBy: user.username, addedByRole: user.role,
    };
    setDocs(p => [nd, ...p]);
    docAudit("Document added", nd, "MEDIUM");
    toast("Document added: " + nd.name, "success");
    setShowAdd(false);
    setForm({ name:"", caseId:"", type:"MOTION", desc:"", classification:"STANDARD" });
  };

  const saveEdit = () => {
    if (!editDoc) return;
    setDocs(p => p.map(d => d.id === editDoc.id ? {
      ...editDoc,
      lastEditedBy: user.username,
      lastEditedAt: new Date().toISOString(),
    } : d));
    docAudit("Document edited", editDoc, "MEDIUM");
    toast("Document updated", "success");
    setEditDoc(null);
  };

  const removeDoc = (doc) => {
    setDocs(p => p.filter(d => d.id !== doc.id));
    docAudit("Document deleted", doc, "HIGH");
    toast("Document removed: " + doc.name, "warn");
    setConfirmDelete(null);
  };

  const filtered = docs.filter(d => {
    if (typeFilter !== "ALL" && d.type !== typeFilter) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) &&
        !d.caseId?.toLowerCase().includes(search.toLowerCase()) &&
        !d.desc?.toLowerCase().includes(search.toLowerCase())) return false;
    if (tab === "mine" && d.by !== user.username) return false;
    return true;
  });

  const classColor = { STANDARD:"gray", CONFIDENTIAL:"gold", RESTRICTED:"red", "TOP SECRET":"red" };
  const typeColor  = { MOTION:"teal", AFFIDAVIT:"blue", INDICTMENT:"red", AGREEMENT:"green", WARRANT:"gold", BRIEF:"teal", ORDER:"gold", SUBPOENA:"red", EXHIBIT:"blue", REPORT:"gray", CORRESPONDENCE:"gray", OTHER:"gray" };

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div className="stitle">Document Management</div>
          <div className="ssub">Secure document repository with full audit trail</div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {canAdd && (
            <button className="btn btn-teal btn-sm" onClick={()=>setShowAdd(true)}>
              <Ico n="plus" s={13}/> Add Document
            </button>
          )}
        </div>
      </div>
      <div className="gl"/>

      {}
      <div className="g4" style={{ marginBottom:16 }}>
        {[
          { l:"Total Documents", v:docs.length, c:"" },
          { l:"My Documents",    v:docs.filter(d=>d.by===user.username).length, c:"teal" },
          { l:"Confidential",    v:docs.filter(d=>d.classification==="CONFIDENTIAL"||d.classification==="RESTRICTED"||d.classification==="TOP SECRET").length, c:"gold" },
          { l:"This Month",      v:docs.filter(d=>d.date>=new Date().toISOString().slice(0,7)).length, c:"" },
        ].map(s=>(
          <div key={s.l} className={`stat-card ${s.c}`}>
            <div className={`stat-v ${s.c}`}>{s.v}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {}
      <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:14, flexWrap:"wrap" }}>
        <div className="tabs" style={{ marginBottom:0 }}>
          {[["all","All Documents"],["mine","My Documents"]].map(([k,l])=>(
            <div key={k} className={`tab${tab===k?" active":""}`} onClick={()=>setTab(k)}>{l}</div>
          ))}
        </div>
        <input className="inp" style={{ maxWidth:220, marginBottom:0 }} value={search}
          onChange={e=>setSearch(e.target.value)} placeholder="Search name, case, description…"/>
        <select className="inp" style={{ maxWidth:160, marginBottom:0 }} value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}>
          <option value="ALL">All Types</option>
          {DOC_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {}
      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight:600 }}>Documents ({filtered.length})</span>
          {!canAdd && <span className="badge bg-gray">Read-only access</span>}
        </div>
        {filtered.length === 0 ? (
          <div style={{ padding:40, textAlign:"center", color:"var(--dim)" }}>
            No documents match your filter.
          </div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Document Name</th>
                  <th>Type</th>
                  <th>Classification</th>
                  <th>Case</th>
                  <th>Added By</th>
                  <th>Date</th>
                  <th>Size</th>
                  {(canEdit||canDelete) && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(doc => (
                  <tr key={doc.id}>
                    <td><span className="mo tsm tdim">{doc.id}</span></td>
                    <td>
                      <div style={{ fontWeight:600, fontSize:13 }}>{doc.name}</div>
                      {doc.desc && <div style={{ fontSize:11, color:"var(--dim)", marginTop:2, maxWidth:240, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{doc.desc}</div>}
                      {doc.lastEditedBy && <div style={{ fontSize:10, color:"var(--dim)", marginTop:2 }}>Edited by {doc.lastEditedBy} · {doc.lastEditedAt?.slice(0,10)}</div>}
                    </td>
                    <td><span className={`badge bg-${typeColor[doc.type]||"gray"}`}>{doc.type}</span></td>
                    <td>
                      <span className={`badge bg-${classColor[doc.classification]||"gray"}`} style={{ fontSize:9 }}>
                        {doc.classification==="TOP SECRET"?"🔴 ":doc.classification==="RESTRICTED"?"🟠 ":doc.classification==="CONFIDENTIAL"?"🟡 ":""}
                        {doc.classification||"STANDARD"}
                      </span>
                    </td>
                    <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{doc.caseId||"—"}</span></td>
                    <td><span className="mo tsm tdim">{doc.by}</span></td>
                    <td><span className="tsm tdim">{doc.date}</span></td>
                    <td><span className="tsm tdim">{doc.size}</span></td>
                    {(canEdit||canDelete) && (
                      <td>
                        <div style={{ display:"flex", gap:5 }}>
                          {canEdit && (
                            <button className="btn btn-xs btn-outline" onClick={()=>setEditDoc({...doc})}>Edit</button>
                          )}
                          {canDelete && (
                            <button className="btn btn-xs" style={{ background:"rgba(224,122,110,.12)", color:"#e07a6e", border:"1px solid rgba(224,122,110,.3)" }}
                              onClick={()=>setConfirmDelete(doc)}>Delete</button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {}
      {showAdd && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>Add New Document</div>
                <div className="tsm tdim">All additions are permanently audit logged with your user ID and timestamp.</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setShowAdd(false)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="g2" style={{ gap:12 }}>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Document Name *</label>
                  <input className="inp" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Motion to Dismiss — State v. Doe"/>
                </div>
                <div className="fg">
                  <label className="lbl">Document Type *</label>
                  <select className="inp" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>
                    {DOC_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Classification</label>
                  <select className="inp" value={form.classification} onChange={e=>setForm(p=>({...p,classification:e.target.value}))}>
                    {CLASSIFICATIONS.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Associated Case ID</label>
                  <input className="inp" value={form.caseId} onChange={e=>setForm(p=>({...p,caseId:e.target.value}))} placeholder="e.g. CASE-2025-0041"/>
                </div>
                <div className="fg">
                  <label className="lbl">Added By</label>
                  <input className="inp" value={user.username} disabled style={{ opacity:.6 }}/>
                </div>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Description</label>
                  <textarea className="inp" style={{ minHeight:70 }} value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))} placeholder="Brief description of document contents and relevance…"/>
                </div>
              </div>
              <div className="alrt alrt-teal" style={{ marginTop:8 }}>
                Adding this document will create an audit entry: <strong>actor=<span style={{color:"var(--teal-l)"}}>{user.username}</span>, timestamp={new Date().toISOString().slice(0,19)}, action=Document added</strong>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowAdd(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={addDoc}><Ico n="plus" s={13}/> Add Document</button>
            </div>
          </div>
        </div>
      )}

      {}
      {editDoc && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>Edit Document — {editDoc.id}</div>
                <div className="tsm tdim">Changes will be logged: editor=<span style={{color:"var(--teal-l)"}}>{user.username}</span>, timestamp={new Date().toISOString().slice(0,19)}</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setEditDoc(null)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="g2" style={{ gap:12 }}>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Document Name *</label>
                  <input className="inp" value={editDoc.name} onChange={e=>setEditDoc(p=>({...p,name:e.target.value}))}/>
                </div>
                <div className="fg">
                  <label className="lbl">Type</label>
                  <select className="inp" value={editDoc.type} onChange={e=>setEditDoc(p=>({...p,type:e.target.value}))}>
                    {DOC_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Classification</label>
                  <select className="inp" value={editDoc.classification||"STANDARD"} onChange={e=>setEditDoc(p=>({...p,classification:e.target.value}))}>
                    {CLASSIFICATIONS.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Associated Case ID</label>
                  <input className="inp" value={editDoc.caseId||""} onChange={e=>setEditDoc(p=>({...p,caseId:e.target.value}))}/>
                </div>
                <div className="fg">
                  <label className="lbl">Original Author</label>
                  <input className="inp" value={editDoc.by} disabled style={{ opacity:.6 }}/>
                </div>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Description</label>
                  <textarea className="inp" style={{ minHeight:70 }} value={editDoc.desc||""} onChange={e=>setEditDoc(p=>({...p,desc:e.target.value}))}/>
                </div>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setEditDoc(null)}>Cancel</button>
              <button className="btn btn-teal" onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {}
      {confirmDelete && (
        <div className="mo-ov">
          <div className="mo-box" style={{ maxWidth:420 }}>
            <div className="mo-hd">
              <div style={{ fontWeight:700, color:"#e07a6e" }}>⚠ Confirm Document Deletion</div>
              <button className="btn btn-outline btn-xs" onClick={()=>setConfirmDelete(null)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-red">
                You are about to <strong>permanently delete</strong> this document. This action is irreversible and will be logged in the audit trail.
              </div>
              <div style={{ marginTop:12, padding:"12px 14px", background:"var(--surf)", borderRadius:"var(--radius)", border:"1px solid var(--b1)" }}>
                <div style={{ fontWeight:700 }}>{confirmDelete.name}</div>
                <div className="tsm tdim">{confirmDelete.id} · {confirmDelete.type} · Added by {confirmDelete.by}</div>
              </div>
              <div style={{ marginTop:10, fontSize:12, color:"var(--dim)" }}>
                Audit entry: actor=<strong>{user.username}</strong>, action=Document deleted, ref=<span style={{fontFamily:"monospace"}}>{confirmDelete.id}</span>, severity=HIGH
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-sm" style={{ background:"rgba(224,122,110,.2)", color:"#e07a6e", border:"1px solid rgba(224,122,110,.4)" }}
                onClick={()=>removeDoc(confirmDelete)}>
                ⚠ Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const JuryPage = () => (
  <SimplePage title="Jury Selection" sub="Jury pool management and voir dire scheduling">
    <div className="g2" style={{ gap:16 }}>
      <div className="card">
        <div className="card-header"><span style={{ fontWeight:600 }}>Active Pools</span></div>
        <div className="card-body">
          {[
            { case:"CASE-2025-0041", pool:24, selected:12, status:"IN_SELECTION" },
            { case:"CASE-2025-0102", pool:30, selected:0,  status:"PENDING" },
          ].map((p,i)=>(
            <div key={i} style={{ padding:"10px 0", borderBottom:i<1?"1px solid var(--b1)":"none" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span className="mo tsm">{p.case}</span>
                {statusBadge(p.status)}
              </div>
              <div style={{ fontSize:12, color:"var(--mid)" }}>Pool: {p.pool} · Selected: {p.selected}/12</div>
              <div className="pbar" style={{ marginTop:6 }}><div className="pbar-fill" style={{ width:`${(p.selected/12)*100}%` }}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span style={{ fontWeight:600 }}>Juror Registry</span></div>
        <div className="card-body">
          <div className="alrt alrt-teal">42 qualified jurors available in current pool.</div>
          <div style={{ fontSize:13, color:"var(--mid)", lineHeight:1.7 }}>Jury selection is managed under court supervision. Voir dire scheduling is coordinated with the presiding judge and both counsel.</div>
        </div>
      </div>
    </div>
  </SimplePage>
);

const JudgeSectionPage = ({ user, allUsers, cases, setCases, auditLog, setAuditLog }) => {

  const JUDGE_ROLES = ["GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE","ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"];
  const isAuthorized = JUDGE_ROLES.includes(user?.role);
  const judgeId  = getJudgeId(user);
  const seniorJudge = isSeniorJudge(user?.role);

  const authGuard = (action, caseId) => {
    if (!isAuthorized) { toast("Access denied — judicial clearance required","error"); return false; }
    if (!isJudgeRole(user.role) && !["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"].includes(user.role)) { toast("Insufficient judicial authority","error"); return false; }
    return true;
  };

  const [tab, setTab]              = useState("mycases");
  const [jAuditLog, setJAuditLog]  = useState(JUDICIAL_AUDIT_LOG);
  const [rulings, setRulings]      = useState(INIT_RULINGS);
  const [jDocs, setJDocs]          = useState(INIT_JUDICIAL_DOCS);
  const [jNotes, setJNotes]        = useState(INIT_JUDICIAL_NOTES);
  const [wRequests, setWRequests]  = useState(INIT_WARRANT_REQUESTS);
  const [localHearings, setLocalHearings] = useState(INIT_HEARINGS);
  const [selectedCase, setSelectedCase]   = useState(null);
  const [mfaConfirmed, setMfaConfirmed]   = useState(false);
  const [mfaModal, setMfaModal]           = useState(false);
  const [mfaCode, setMfaCode]             = useState("");
  const [mfaTarget, setMfaTarget]         = useState(null); // { action, payload }
  const [sessionTimer, setSessionTimer]   = useState(1800); // 30min judicial session
  const [showRulingModal, setShowRulingModal]   = useState(false);
  const [showNoteModal, setShowNoteModal]         = useState(false);
  const [showDocModal, setShowDocModal]           = useState(false);
  const [showHearingModal, setShowHearingModal]   = useState(false);
  const [showReportModal, setShowReportModal]     = useState(false);
  const [showAppealModal, setShowAppealModal]     = useState(false);
  const [lockConfirmCase, setLockConfirmCase]     = useState(null);
  const [rulingForm, setRulingForm] = useState({ verdict:"GUILTY", sentence:"", fine:"", reasoning:"", charges:[""], appealDeadline:"" });
  const [noteForm, setNoteForm]     = useState({ note:"", classification:"CONFIDENTIAL" });
  const [docForm, setDocForm]       = useState({ name:"", type:"COURT_ORDER", classification:"CONFIDENTIAL" });
  const [hearingForm, setHearingForm] = useState({ title:"", date:"", time:"09:00", room:"Courtroom 1", type:"TRIAL" });
  const [reportType, setReportType]   = useState("CASE_SUMMARY");

  React.useEffect(() => {
    if (!isAuthorized) return;
    const interval = setInterval(() => {
      setSessionTimer(t => {
        if (t <= 1) { toast("Judicial session expired — re-authentication required","error"); clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isAuthorized]);

  const fmtTimer = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const judicialAudit = (action, caseId, detail, severity="HIGH") => {
    const entry = {
      id: "JAL-" + Date.now(),
      ts: new Date().toISOString(),
      judgeId: judgeId || user.id,
      judge: user.charName || user.username,
      action, caseId, detail,
      ip: "10.0." + Math.floor(Math.random()*3+1) + "." + Math.floor(Math.random()*200+10),
      device: "Secure Browser / Platform Session",
      severity,
    };
    setJAuditLog(p => [entry, ...p]); // prepend — newest first
    if (setAuditLog) setAuditLog(prev => [{ ...entry, type:"judicial", actor:user.username }, ...prev.slice(0,499)]);
  };

  const requireMfa = (action, payload) => {
    if (mfaConfirmed) { action(payload); return; }
    setMfaTarget({ action, payload });
    setMfaModal(true);
  };

  const confirmMfa = () => {
    if (mfaCode !== "123456") { toast("Invalid MFA code","error"); return; } // demo code
    setMfaConfirmed(true);
    setMfaModal(false);
    setMfaCode("");
    if (mfaTarget?.action) mfaTarget.action(mfaTarget.payload);
    setMfaTarget(null);
    toast("MFA verified — judicial session elevated","success");
  };

  const allCases = cases || INIT_CASES;
  const myCases = allCases.filter(c => judgeCanAccessCase(judgeId, c, user.role));

  const recordVerdict = (targetCase) => {
    if (!authGuard("RECORD_VERDICT", targetCase?.id)) return;
    if (!judgeCanAccessCase(judgeId, targetCase, user.role)) { toast("Unauthorized — this case is not assigned to you","error"); return; }
    if (targetCase.locked) { toast("Case is locked — file an appeal to modify","error"); return; }
    const newRuling = {
      id: "RUL-" + String(Date.now()).slice(-5),
      caseId: targetCase.id,
      judgeId,
      judge: user.charName || user.username,
      verdict: rulingForm.verdict,
      sentence: rulingForm.sentence,
      fine: rulingForm.fine,
      reasoning: rulingForm.reasoning,
      charges: rulingForm.charges.filter(Boolean),
      date: new Date().toISOString().slice(0,10),
      locked: false,
      appeals: [],
      appealDeadline: rulingForm.appealDeadline,
    };
    setRulings(p => [newRuling, ...p]);
    if (setCases) {
      setCases(prev => prev.map(c => c.id === targetCase.id ? {
        ...c,
        verdict: rulingForm.verdict,
        history: [...(c.history||[]), { d: new Date().toISOString().slice(0,10), a: `Verdict recorded: ${rulingForm.verdict}`, by: judgeId }]
      } : c));
    }
    judicialAudit("VERDICT_RECORDED", targetCase.id,
      `Verdict: ${rulingForm.verdict}. Sentence: ${rulingForm.sentence||"None"}. Fine: ${rulingForm.fine||"None"}. Reasoning filed.`,
      "CRITICAL");
    toast(`Verdict recorded: ${rulingForm.verdict}`, "success");
    setShowRulingModal(false);
    setRulingForm({ verdict:"GUILTY", sentence:"", fine:"", reasoning:"", charges:[""], appealDeadline:"" });
  };

  const lockCase = (targetCase) => {
    if (!authGuard("LOCK_CASE", targetCase?.id)) return;
    if (!judgeCanAccessCase(judgeId, targetCase, user.role)) { toast("Unauthorized case access","error"); return; }
    if (setCases) {
      setCases(prev => prev.map(c => c.id === targetCase.id ? {
        ...c,
        status: "CLOSED",
        locked: true,
        lockedBy: judgeId,
        lockedAt: new Date().toISOString(),
        history: [...(c.history||[]), { d: new Date().toISOString().slice(0,10), a: "Case locked by judicial order — no further modification permitted", by: judgeId }]
      } : c));
    }
    judicialAudit("CASE_LOCKED", targetCase.id,
      `Case locked post-verdict. Status → CLOSED. Further modifications blocked pending formal appeal.`,
      "CRITICAL");
    toast("Case locked and archived", "success");
    setLockConfirmCase(null);
  };

  const reviewWarrant = (reqId, decision, reason="") => {
    if (!authGuard("WARRANT_REVIEW", reqId)) return;
    const req = wRequests.find(r => r.id === reqId);
    if (!req) return;
    if (!judgeCanAccessCase(judgeId, allCases.find(c=>c.id===req.caseId), user.role)) {
      toast("You are not the assigned judge for this case","error"); return;
    }
    setWRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: decision, reviewedBy: judgeId, reviewedAt: new Date().toISOString(), reason } : r));
    judicialAudit(`WARRANT_${decision}`, req.caseId,
      `Warrant request ${reqId} (${req.type}) — ${decision}. Subject: ${req.subject}.`,
      "HIGH");
    toast(`Warrant ${decision.toLowerCase()}`, decision === "APPROVED" ? "success" : "warn");
  };

  const addNote = (targetCase) => {
    if (!authGuard("ADD_NOTE", targetCase?.id)) return;
    if (!noteForm.note.trim()) { toast("Note content required","error"); return; }
    const note = {
      id: "JNT-" + String(Date.now()).slice(-5),
      caseId: targetCase.id,
      judgeId, judge: user.charName || user.username,
      note: noteForm.note,
      classification: noteForm.classification,
      ts: new Date().toISOString(),
      protected: true,
    };
    setJNotes(p => [note, ...p]);
    judicialAudit("JUDICIAL_NOTE_ADDED", targetCase.id,
      `Protected judicial note filed. Classification: ${noteForm.classification}.`,
      "MEDIUM");
    toast("Judicial note filed (protected)", "success");
    setShowNoteModal(false);
    setNoteForm({ note:"", classification:"CONFIDENTIAL" });
  };

  const uploadDoc = (targetCase) => {
    if (!authGuard("DOC_UPLOAD", targetCase?.id)) return;
    if (!docForm.name) { toast("Document name required","error"); return; }
    const doc = {
      id: "JDC-" + String(Date.now()).slice(-5),
      caseId: targetCase.id,
      judgeId, name: docForm.name, type: docForm.type,
      classification: docForm.classification,
      date: new Date().toISOString().slice(0,10),
      hash: "sha256:" + Math.random().toString(36).slice(2,10) + "...",
      size: Math.floor(Math.random()*300+50) + " KB",
      status: "SIGNED",
      sigDate: new Date().toISOString().slice(0,10),
    };
    setJDocs(p => [doc, ...p]);
    judicialAudit("DOCUMENT_UPLOADED", targetCase.id,
      `Judicial document uploaded: ${doc.name} (${doc.type}). Hash: ${doc.hash}.`,
      "HIGH");
    toast("Document filed and digitally signed", "success");
    setShowDocModal(false);
    setDocForm({ name:"", type:"COURT_ORDER", classification:"CONFIDENTIAL" });
  };

  const scheduleHearing = (targetCase) => {
    if (!authGuard("SCHEDULE_HEARING", targetCase?.id)) return;
    if (!hearingForm.date || !hearingForm.title) { toast("Hearing title and date required","error"); return; }
    const h = {
      id: "HRG-" + String(Date.now()).slice(-5),
      caseId: targetCase.id,
      title: hearingForm.title,
      date: hearingForm.date, time: hearingForm.time,
      room: hearingForm.room, type: hearingForm.type,
      judge: judgeId, status: "SCHEDULED",
      scheduledBy: judgeId,
    };
    setLocalHearings(p => [h, ...p]);
    judicialAudit("HEARING_SCHEDULED", targetCase.id,
      `Hearing scheduled: ${h.title} — ${h.date} ${h.time}, ${h.room}.`,
      "MEDIUM");
    toast("Hearing scheduled", "success");
    setShowHearingModal(false);
    setHearingForm({ title:"", date:"", time:"09:00", room:"Courtroom 1", type:"TRIAL" });
  };

  if (!isAuthorized) {
    return (
      <div className="fade" style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
        <div style={{ textAlign:"center", maxWidth:480 }}>
          <div style={{ fontSize:64, marginBottom:16 }}>🔒</div>
          <div style={{ fontSize:20, fontWeight:700, color:"var(--teal-l)", marginBottom:8 }}>Judicial Workspace — Access Denied</div>
          <div style={{ color:"var(--dim)", marginBottom:16 }}>This section is restricted to authorized judicial officers only. Your role (<strong style={{color:"var(--mid)"}}>{user?.role}</strong>) does not have judicial clearance.</div>
          <div className="alrt alrt-red">
            Unauthorized access attempts are logged and may result in disciplinary action. This incident has been recorded.
          </div>
          <div style={{ marginTop:12, fontSize:11, color:"var(--dim)", fontFamily:"'IBM Plex Mono',monospace" }}>
            INCIDENT REF: {user?.id}-{new Date().toISOString().slice(0,19)} · IP LOGGED
          </div>
        </div>
      </div>
    );
  }

  const judgeRecord = INIT_JUDGES.find(j => j.id === judgeId);
  const classColor = { STANDARD:"gray", CONFIDENTIAL:"gold", RESTRICTED:"red", "TOP SECRET":"red" };

  const TABS = [
    { key:"mycases",  label:"My Cases",         icon:"⚖" },
    { key:"evidence", label:"Evidence",          icon:"🔍" },
    { key:"rulings",  label:"Rulings & Verdicts",icon:"📜" },
    { key:"warrants", label:"Warrant Review",    icon:"🔐" },
    { key:"hearings", label:"Hearings",          icon:"📅" },
    { key:"docs",     label:"Judicial Docs",     icon:"📁" },
    { key:"notes",    label:"Judicial Notes",    icon:"🗒" },
    { key:"reports",  label:"Court Reports",     icon:"📊" },
    { key:"auditlog", label:"Judicial Audit",    icon:"🛡" },
  ];

  return (
    <div className="fade">
      {}
      <div style={{ background:"linear-gradient(135deg,rgba(26,122,122,.15) 0%,rgba(26,122,122,.05) 100%)", border:"1px solid var(--teal-d)", borderRadius:"var(--radius)", padding:"16px 20px", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:48, height:48, background:"var(--teal-d)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>⚖</div>
          <div>
            <div style={{ fontWeight:700, fontSize:16, color:"var(--teal-l)" }}>Judicial Workspace — Secure</div>
            <div style={{ fontSize:12, color:"var(--dim)" }}>
              {judgeRecord ? judgeRecord.name : user.charName} · {judgeRecord?.court || "Court of Law"} · {judgeRecord?.chamber || ""}
            </div>
            <div style={{ display:"flex", gap:8, marginTop:4 }}>
              <span className="badge bg-teal" style={{ fontSize:9 }}>⚖ {ROLES[user.role]?.label}</span>
              <span className="badge bg-green" style={{ fontSize:9 }}>🔒 AUTHENTICATED</span>
              {mfaConfirmed && <span className="badge bg-gold" style={{ fontSize:9 }}>🛡 MFA VERIFIED</span>}
              {seniorJudge && <span className="badge bg-gold" style={{ fontSize:9 }}>★ SENIOR JUDICIAL PRIVILEGE</span>}
            </div>
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:12, color:"var(--dim)", marginBottom:4 }}>Session Timeout</div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:20, fontWeight:700, color:sessionTimer < 300 ? "#e07a6e" : "var(--teal-l)" }}>{fmtTimer(sessionTimer)}</div>
          <div style={{ fontSize:10, color:"var(--dim)", marginTop:2 }}>Judge ID: {judgeId || "N/A"}</div>
          {!mfaConfirmed && (
            <button className="btn btn-xs btn-teal" style={{ marginTop:6 }} onClick={()=>setMfaModal(true)}>🛡 Verify MFA</button>
          )}
        </div>
      </div>

      {}
      <div className="g4" style={{ marginBottom:16 }}>
        {[
          { l:"Assigned Cases",    v:myCases.length,                                          c:"" },
          { l:"Active / In Court", v:myCases.filter(c=>["IN_COURT","OPEN"].includes(c.status)).length, c:"teal" },
          { l:"Pending Rulings",   v:myCases.filter(c=>c.status==="IN_COURT"&&!c.verdict).length,      c:"gold" },
          { l:"Warrant Requests",  v:wRequests.filter(r=>r.status==="PENDING"&&(r.assignedJudge===judgeId||seniorJudge)).length, c:"red" },
        ].map(s=>(
          <div key={s.l} className={`stat-card ${s.c}`}>
            <div className={`stat-v ${s.c}`}>{s.v}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {}
      <div className="alrt alrt-gold" style={{ marginBottom:14, fontSize:11 }}>
        <strong>⚖ Judicial Authority Notice:</strong> You are operating within an isolated judicial workspace. All actions generate immutable audit logs stored separately from operational data. Unauthorized access to cases not assigned to you is prohibited and logged. This workspace is subject to judicial oversight review.
      </div>

      {}
      <div className="tabs" style={{ marginBottom:16, flexWrap:"wrap", gap:4 }}>
        {TABS.map(t=>(
          <div key={t.key} className={`tab${tab===t.key?" active":""}`} onClick={()=>setTab(t.key)} style={{ gap:5 }}>
            <span>{t.icon}</span> {t.label}
            {t.key==="warrants" && wRequests.filter(r=>r.status==="PENDING"&&(r.assignedJudge===judgeId||seniorJudge)).length > 0 && (
              <span style={{ background:"#e07a6e", color:"#fff", borderRadius:9, fontSize:9, padding:"1px 5px", marginLeft:2 }}>
                {wRequests.filter(r=>r.status==="PENDING"&&(r.assignedJudge===judgeId||seniorJudge)).length}
              </span>
            )}
          </div>
        ))}
      </div>

      {}
      {tab === "mycases" && (
        <div>
          {myCases.length === 0 ? (
            <div className="card" style={{ padding:40, textAlign:"center", color:"var(--dim)" }}>
              No cases currently assigned to your judicial record.
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {myCases.map(c => {
                const myHearings = localHearings.filter(h=>h.caseId===c.id);
                const myRuling   = rulings.find(r=>r.caseId===c.id);
                const myNotes    = jNotes.filter(n=>n.caseId===c.id);
                const myDocs     = jDocs.filter(d=>d.caseId===c.id);
                return (
                  <div key={c.id} className="card" style={{ border: c.locked ? "1px solid #e07a6e" : c.status==="IN_COURT"?"1px solid var(--teal-d)":"1px solid var(--b1)" }}>
                    <div className="card-header" style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                        <span style={{ fontWeight:700, fontSize:14 }}>{c.title}</span>
                        {statusBadge(c.status)}
                        {priorityBadge(c.priority)}
                        {c.locked && <span className="badge bg-red" style={{ fontSize:10 }}>🔒 LOCKED</span>}
                        {myRuling && <span className={`badge bg-${myRuling.verdict==="GUILTY"?"red":myRuling.verdict==="NOT_GUILTY"?"green":"gold"}`} style={{ fontSize:10 }}>Verdict: {myRuling.verdict.replace(/_/g," ")}</span>}
                      </div>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        <span className="badge bg-gray" style={{ fontSize:10 }}>{c.id}</span>
                        <span className="badge bg-gray" style={{ fontSize:10 }}>Filed: {c.filed}</span>
                        {c.hearing && <span className="badge bg-teal" style={{ fontSize:10 }}>Next: {c.hearing}</span>}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="g3" style={{ gap:10, marginBottom:12 }}>
                        <div style={{ fontSize:12, color:"var(--dim)" }}><strong style={{color:"var(--mid)"}}>Type:</strong> {c.type}</div>
                        <div style={{ fontSize:12, color:"var(--dim)" }}><strong style={{color:"var(--mid)"}}>Plaintiff:</strong> {c.plaintiff}</div>
                        <div style={{ fontSize:12, color:"var(--dim)" }}><strong style={{color:"var(--mid)"}}>Defendant:</strong> {c.defendant}</div>
                        <div style={{ fontSize:12, color:"var(--dim)" }}><strong style={{color:"var(--mid)"}}>Assigned Lawyer:</strong> {c.lawyer}</div>
                        <div style={{ fontSize:12, color:"var(--dim)" }}><strong style={{color:"var(--mid)"}}>Hearing Date:</strong> {c.hearing||"TBD"}</div>
                        <div style={{ fontSize:12, color:"var(--dim)" }}><strong style={{color:"var(--mid)"}}>Hearings:</strong> {myHearings.length} scheduled · Notes: {myNotes.length} · Docs: {myDocs.length}</div>
                      </div>
                      <div style={{ fontSize:12, color:"var(--dim)", marginBottom:12 }}>{c.desc}</div>

                      {}
                      {c.history && c.history.length > 0 && (
                        <div style={{ borderLeft:"2px solid var(--teal-d)", paddingLeft:12, marginBottom:12 }}>
                          {c.history.slice(-3).reverse().map((h,i)=>(
                            <div key={i} style={{ marginBottom:6, fontSize:11, color:"var(--dim)" }}>
                              <span style={{ color:"var(--teal-l)", fontFamily:"'IBM Plex Mono',monospace" }}>{h.d}</span>
                              {" — "}{h.a}
                              <span style={{ color:"var(--dim)", marginLeft:8 }}>by {h.by}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {}
                      {!c.locked && (
                        <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                          {c.status === "IN_COURT" && !myRuling && (
                            <button className="btn btn-teal btn-sm" onClick={()=>{if(!authGuard("RULING"))return;setSelectedCase(c);requireMfa(()=>setShowRulingModal(true),null);}}>
                              📜 Record Verdict
                            </button>
                          )}
                          <button className="btn btn-sm btn-outline" onClick={()=>{setSelectedCase(c);setShowHearingModal(true);}}>
                            📅 Schedule Hearing
                          </button>
                          <button className="btn btn-sm btn-outline" onClick={()=>{setSelectedCase(c);setShowNoteModal(true);}}>
                            🗒 Add Judicial Note
                          </button>
                          <button className="btn btn-sm btn-outline" onClick={()=>{setSelectedCase(c);setShowDocModal(true);}}>
                            📁 Upload Document
                          </button>
                          {myRuling && !c.locked && (
                            <button className="btn btn-sm" style={{ background:"rgba(224,122,110,.15)",color:"#e07a6e",border:"1px solid rgba(224,122,110,.4)" }}
                              onClick={()=>{requireMfa(()=>setLockConfirmCase(c),null);}}>
                              🔒 Lock Case
                            </button>
                          )}
                        </div>
                      )}
                      {c.locked && (
                        <div style={{ display:"flex", gap:7 }}>
                          <button className="btn btn-xs btn-outline" onClick={()=>{setSelectedCase(c);setShowAppealModal(true);}}>⚖ File Appeal</button>
                          <span style={{ fontSize:11, color:"var(--dim)", alignSelf:"center" }}>Locked by {c.lockedBy} on {c.lockedAt?.slice(0,10)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {}
      {tab === "evidence" && (
        <div>
          <div className="alrt alrt-teal" style={{ marginBottom:12 }}>
            Evidence shown is restricted to cases assigned to your judicial record. Chain-of-custody is enforced.
          </div>
          {myCases.map(c => {
            const caseEv = INIT_EVIDENCE.filter(e => e.caseId === c.id);
            if (caseEv.length === 0) return null;
            return (
              <div key={c.id} className="card" style={{ marginBottom:14 }}>
                <div className="card-header">
                  <span style={{ fontWeight:600 }}>{c.title}</span>
                  <span className="badge bg-gray">{caseEv.length} items</span>
                </div>
                <div style={{ overflowX:"auto" }}>
                  <table className="tbl">
                    <thead><tr><th>ID</th><th>Title</th><th>Type</th><th>Status</th><th>Submitted By</th><th>Date</th><th>Hash (partial)</th><th>Chain of Custody</th></tr></thead>
                    <tbody>
                      {caseEv.map(e=>(
                        <tr key={e.id}>
                          <td><span className="mo tsm tdim">{e.id}</span></td>
                          <td style={{ fontWeight:600 }}>{e.title}</td>
                          <td><span className="tag">{e.type}</span></td>
                          <td><span className={`badge bg-${e.status==="VERIFIED"?"green":e.status==="UNDER_REVIEW"?"gold":"gray"}`}>{e.status}</span></td>
                          <td><span className="mo tsm tdim">{e.by}</span></td>
                          <td><span className="tsm tdim">{e.date}</span></td>
                          <td><span className="mo tsm tdim">{e.hash?.slice(0,20)}…</span></td>
                          <td style={{ maxWidth:180 }}>{(e.custody||[]).join(" → ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
          {myCases.every(c=>INIT_EVIDENCE.filter(e=>e.caseId===c.id).length===0) && (
            <div className="card" style={{ padding:40, textAlign:"center", color:"var(--dim)" }}>No evidence records found for your assigned cases.</div>
          )}
        </div>
      )}

      {}
      {tab === "rulings" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:15 }}>Verdicts &amp; Rulings</div>
            <div className="alrt alrt-gold" style={{ marginBottom:0, fontSize:11, padding:"6px 12px" }}>All rulings are cryptographically hashed and immutable</div>
          </div>
          {rulings.filter(r => myCases.some(c=>c.id===r.caseId)).length === 0 ? (
            <div className="card" style={{ padding:40, textAlign:"center", color:"var(--dim)" }}>No rulings recorded for your assigned cases.</div>
          ) : (
            rulings.filter(r => myCases.some(c=>c.id===r.caseId)).map(r => {
              const theCase = allCases.find(c=>c.id===r.caseId);
              return (
                <div key={r.id} className="card" style={{ marginBottom:14, borderLeft:"4px solid "+(r.verdict==="GUILTY"?"#e07a6e":r.verdict==="NOT_GUILTY"?"#4cd98a":"#f5c842") }}>
                  <div className="card-header">
                    <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <span style={{ fontWeight:700 }}>{theCase?.title}</span>
                      <span className={`badge bg-${r.verdict==="GUILTY"?"red":r.verdict==="NOT_GUILTY"?"green":"gold"}`}>{r.verdict.replace(/_/g," ")}</span>
                      {r.locked && <span className="badge bg-red" style={{ fontSize:9 }}>🔒 LOCKED</span>}
                    </div>
                    <span className="tsm tdim">{r.date} · {r.judge}</span>
                  </div>
                  <div className="card-body">
                    <div className="g3" style={{ gap:10, marginBottom:10 }}>
                      <div style={{ fontSize:12 }}><strong>Case ID:</strong> <span className="mo tsm">{r.caseId}</span></div>
                      <div style={{ fontSize:12 }}><strong>Ruling ID:</strong> <span className="mo tsm">{r.id}</span></div>
                      {r.sentence && <div style={{ fontSize:12 }}><strong>Sentence:</strong> {r.sentence}</div>}
                      {r.fine && <div style={{ fontSize:12 }}><strong>Fine:</strong> {r.fine}</div>}
                      {r.appealDeadline && <div style={{ fontSize:12 }}><strong>Appeal Deadline:</strong> {r.appealDeadline}</div>}
                    </div>
                    {r.charges?.length > 0 && (
                      <div style={{ marginBottom:10 }}>
                        <strong style={{ fontSize:11 }}>Charges:</strong>
                        <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:4 }}>{r.charges.filter(Boolean).map((ch,i)=><span key={i} className="badge bg-red">{ch}</span>)}</div>
                      </div>
                    )}
                    {r.reasoning && (
                      <div style={{ background:"var(--surf)", borderRadius:6, padding:"10px 12px", fontSize:12, borderLeft:"3px solid var(--teal-d)" }}>
                        <strong style={{ fontSize:10, color:"var(--dim)", display:"block", marginBottom:4 }}>JUDICIAL REASONING:</strong>
                        {r.reasoning}
                      </div>
                    )}
                    {r.appeals?.length > 0 && (
                      <div style={{ marginTop:10 }}>
                        <strong style={{ fontSize:11 }}>Appeals Filed: {r.appeals.length}</strong>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {}
      {tab === "warrants" && (
        <div>
          <div className="alrt alrt-teal" style={{ marginBottom:12 }}>
            Only warrant requests for cases assigned to you are displayed. Approvals generate immutable judicial audit entries.
          </div>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight:600 }}>Pending Warrant Requests ({wRequests.filter(r=>r.status==="PENDING"&&(r.assignedJudge===judgeId||seniorJudge)).length})</span></div>
            <div style={{ overflowX:"auto" }}>
              <table className="tbl">
                <thead><tr><th>Req ID</th><th>Type</th><th>Case</th><th>Subject</th><th>Grounds</th><th>Requested By</th><th>Urgency</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {wRequests.filter(r=>(r.assignedJudge===judgeId||seniorJudge)).map(r=>(
                    <tr key={r.id}>
                      <td><span className="mo tsm tdim">{r.id}</span></td>
                      <td><span className={`badge bg-${r.type==="ARREST"?"red":r.type==="WIRETAP"?"gold":"blue"}`}>{r.type}</span></td>
                      <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{r.caseId}</span></td>
                      <td style={{ maxWidth:140, fontSize:12 }}>{r.subject}</td>
                      <td style={{ maxWidth:200, fontSize:11, color:"var(--dim)" }}>{r.grounds}</td>
                      <td><span className="mo tsm tdim">{r.requestedBy}</span></td>
                      <td><span className={`badge bg-${r.urgency==="HIGH"?"red":r.urgency==="MEDIUM"?"gold":"gray"}`}>{r.urgency}</span></td>
                      <td><span className={`badge bg-${r.status==="PENDING"?"gold":r.status==="APPROVED"?"green":"red"}`}>{r.status}</span></td>
                      <td>
                        {r.status === "PENDING" && (
                          <div style={{ display:"flex", gap:4 }}>
                            <button className="btn btn-xs btn-teal" onClick={()=>requireMfa(()=>reviewWarrant(r.id,"APPROVED"),null)}>Approve</button>
                            <button className="btn btn-xs" style={{ background:"rgba(224,122,110,.12)",color:"#e07a6e",border:"1px solid rgba(224,122,110,.3)",fontSize:11 }} onClick={()=>reviewWarrant(r.id,"DENIED")}>Deny</button>
                          </div>
                        )}
                        {r.status !== "PENDING" && <span style={{ fontSize:10, color:"var(--dim)" }}>Reviewed {r.reviewedAt?.slice(0,10)}</span>}
                      </td>
                    </tr>
                  ))}
                  {wRequests.filter(r=>(r.assignedJudge===judgeId||seniorJudge)).length===0 && (
                    <tr><td colSpan={9} style={{ textAlign:"center", color:"var(--dim)", padding:20 }}>No pending warrant requests</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {}
      {tab === "hearings" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:15 }}>Hearing Schedule</div>
            {selectedCase && <button className="btn btn-teal btn-sm" onClick={()=>setShowHearingModal(true)}><Ico n="plus" s={13}/> Schedule Hearing</button>}
          </div>
          {!selectedCase && (
            <div className="alrt alrt-teal" style={{ marginBottom:12 }}>Select a case from My Cases to schedule hearings, or view all assigned hearings below.</div>
          )}
          <div className="card">
            <div className="card-header"><span style={{ fontWeight:600 }}>All Assigned Hearings</span></div>
            <div style={{ overflowX:"auto" }}>
              <table className="tbl">
                <thead><tr><th>ID</th><th>Title</th><th>Case</th><th>Type</th><th>Date</th><th>Time</th><th>Courtroom</th><th>Status</th></tr></thead>
                <tbody>
                  {localHearings.filter(h => myCases.some(c=>c.id===h.caseId)).map(h=>(
                    <tr key={h.id}>
                      <td><span className="mo tsm tdim">{h.id}</span></td>
                      <td style={{ fontWeight:600 }}>{h.title}</td>
                      <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{h.caseId}</span></td>
                      <td><span className="tag">{h.type}</span></td>
                      <td><span className="mo tsm">{h.date}</span></td>
                      <td>{h.time}</td>
                      <td>{h.room}</td>
                      <td><span className={`badge bg-${h.status==="SCHEDULED"?"teal":h.status==="COMPLETED"?"green":"gray"}`}>{h.status}</span></td>
                    </tr>
                  ))}
                  {localHearings.filter(h=>myCases.some(c=>c.id===h.caseId)).length===0 && (
                    <tr><td colSpan={8} style={{ textAlign:"center", color:"var(--dim)", padding:20 }}>No hearings for assigned cases</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {}
      {tab === "docs" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:15 }}>Judicial Documents</div>
              <div style={{ fontSize:11, color:"var(--dim)" }}>Signed judicial documents. All files are cryptographically hashed and encrypted at rest.</div>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight:600 }}>Filed Documents ({jDocs.filter(d=>myCases.some(c=>c.id===d.caseId)).length})</span></div>
            <div style={{ overflowX:"auto" }}>
              <table className="tbl">
                <thead><tr><th>Doc ID</th><th>Name</th><th>Type</th><th>Classification</th><th>Case</th><th>Date</th><th>Hash</th><th>Size</th><th>Status</th></tr></thead>
                <tbody>
                  {jDocs.filter(d=>myCases.some(c=>c.id===d.caseId)).map(d=>(
                    <tr key={d.id}>
                      <td><span className="mo tsm tdim">{d.id}</span></td>
                      <td style={{ fontWeight:600 }}>{d.name}</td>
                      <td><span className="tag">{d.type}</span></td>
                      <td><span className={`badge bg-${classColor[d.classification]||"gray"}`} style={{ fontSize:9 }}>{d.classification}</span></td>
                      <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{d.caseId}</span></td>
                      <td><span className="tsm tdim">{d.date}</span></td>
                      <td><span className="mo tsm tdim">{d.hash?.slice(0,18)}…</span></td>
                      <td>{d.size}</td>
                      <td><span className={`badge bg-${d.status==="SIGNED"?"green":"gold"}`}>{d.status}</span></td>
                    </tr>
                  ))}
                  {jDocs.filter(d=>myCases.some(c=>c.id===d.caseId)).length===0 && (
                    <tr><td colSpan={9} style={{ textAlign:"center", color:"var(--dim)", padding:20 }}>No judicial documents filed</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {}
      {tab === "notes" && (
        <div>
          <div className="alrt alrt-gold" style={{ marginBottom:12 }}>
            <strong>🔒 Protected Judicial Notes:</strong> These notes are visible to judges only. Lawyers, BA members, and administrative staff cannot view or edit them. Notes are immutable after filing.
          </div>
          {jNotes.filter(n=>myCases.some(c=>c.id===n.caseId)).length === 0 ? (
            <div className="card" style={{ padding:40, textAlign:"center", color:"var(--dim)" }}>No judicial notes for your assigned cases.</div>
          ) : (
            jNotes.filter(n=>myCases.some(c=>c.id===n.caseId)).map(n=>{
              const theCase = allCases.find(c=>c.id===n.caseId);
              return (
                <div key={n.id} className="card" style={{ marginBottom:12, borderLeft:"3px solid var(--teal-d)" }}>
                  <div className="card-header">
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{ fontWeight:600, fontSize:13 }}>{theCase?.title}</span>
                      <span className="badge bg-gold" style={{ fontSize:9 }}>🔒 JUDICIAL NOTE</span>
                      {n.classification && <span className={`badge bg-${classColor[n.classification]||"gray"}`} style={{ fontSize:9 }}>{n.classification}</span>}
                    </div>
                    <span className="tsm tdim">{n.judge} · {n.ts?.slice(0,16).replace("T"," ")}</span>
                  </div>
                  <div className="card-body">
                    <div style={{ fontSize:13, lineHeight:1.6 }}>{n.note}</div>
                    <div style={{ marginTop:8, fontSize:10, color:"var(--dim)", fontFamily:"'IBM Plex Mono',monospace" }}>
                      NOTE ID: {n.id} · JUDGE ID: {n.judgeId} · IMMUTABLE
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {}
      {tab === "reports" && (
        <div>
          <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" }}>
            {["CASE_SUMMARY","VERDICT_REPORT","HEARING_LOG","WARRANT_REPORT","FULL_JUDICIAL_REPORT"].map(rt=>(
              <button key={rt} className={`btn btn-sm ${reportType===rt?"btn-teal":"btn-outline"}`} onClick={()=>setReportType(rt)}>
                {rt.replace(/_/g," ")}
              </button>
            ))}
          </div>
          <div className="card">
            <div className="card-header" style={{ background:"var(--teal-d)", borderRadius:"var(--radius) var(--radius) 0 0" }}>
              <span style={{ fontWeight:700, color:"var(--teal-l)" }}>⚖ OFFICIAL COURT REPORT — {reportType.replace(/_/g," ")}</span>
              <button className="btn btn-xs btn-outline" onClick={()=>{judicialAudit("REPORT_GENERATED","N/A",`Court report generated: ${reportType}`, "MEDIUM"); toast("Report generated & logged","success");}}>
                📄 Generate &amp; Download
              </button>
            </div>
            <div className="card-body">
              <div style={{ borderBottom:"1px solid var(--b1)", paddingBottom:12, marginBottom:12 }}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"var(--dim)" }}>
                  DEPARTMENT OF JUSTICE — OFFICIAL COURT REPORT<br/>
                  Generated: {new Date().toISOString().slice(0,19)} UTC<br/>
                  Judge: {user.charName || user.username} ({judgeId}) — {ROLES[user.role]?.label}<br/>
                  Classification: CONFIDENTIAL / JUDICIAL USE ONLY<br/>
                  Report Type: {reportType}
                </div>
              </div>
              {reportType === "CASE_SUMMARY" && myCases.map(c=>(
                <div key={c.id} style={{ marginBottom:16, paddingBottom:16, borderBottom:"1px solid var(--b1)" }}>
                  <div style={{ fontWeight:700, marginBottom:4 }}>{c.title} — {c.id}</div>
                  <div className="g3" style={{ gap:8, fontSize:12 }}>
                    <div><strong>Status:</strong> {c.status}</div>
                    <div><strong>Priority:</strong> {c.priority}</div>
                    <div><strong>Type:</strong> {c.type}</div>
                    <div><strong>Filed:</strong> {c.filed}</div>
                    <div><strong>Verdict:</strong> {rulings.find(r=>r.caseId===c.id)?.verdict || "PENDING"}</div>
                    <div><strong>Locked:</strong> {c.locked ? "YES" : "NO"}</div>
                  </div>
                </div>
              ))}
              {reportType === "VERDICT_REPORT" && rulings.filter(r=>myCases.some(c=>c.id===r.caseId)).map(r=>(
                <div key={r.id} style={{ marginBottom:14, paddingBottom:14, borderBottom:"1px solid var(--b1)" }}>
                  <div style={{ fontWeight:700 }}>{r.id} — {r.caseId}</div>
                  <div style={{ fontSize:12, marginTop:4 }}><strong>Verdict:</strong> {r.verdict} · <strong>Date:</strong> {r.date} · <strong>Sentence:</strong> {r.sentence||"N/A"}</div>
                  <div style={{ fontSize:12, marginTop:4, color:"var(--dim)" }}>{r.reasoning}</div>
                </div>
              ))}
              {reportType === "HEARING_LOG" && localHearings.filter(h=>myCases.some(c=>c.id===h.caseId)).map(h=>(
                <div key={h.id} style={{ marginBottom:10, fontSize:12 }}>
                  <span className="mo tsm tdim">{h.id}</span> — {h.title} · {h.date} {h.time} · {h.room} · <span className={`badge bg-${h.status==="SCHEDULED"?"teal":"green"}`}>{h.status}</span>
                </div>
              ))}
              {reportType === "WARRANT_REPORT" && wRequests.filter(r=>myCases.some(c=>c.id===r.caseId)).map(r=>(
                <div key={r.id} style={{ marginBottom:10, fontSize:12 }}>
                  <span className="mo tsm tdim">{r.id}</span> — {r.type} · {r.subject} · <span className={`badge bg-${r.status==="APPROVED"?"green":r.status==="DENIED"?"red":"gold"}`}>{r.status}</span>
                </div>
              ))}
              {reportType === "FULL_JUDICIAL_REPORT" && (
                <div style={{ fontSize:12, color:"var(--dim)" }}>
                  <div style={{ fontWeight:700, color:"var(--mid)", marginBottom:8 }}>SUMMARY</div>
                  <div>Assigned Cases: {myCases.length} | Rulings Filed: {rulings.filter(r=>myCases.some(c=>c.id===r.caseId)).length} | Hearings: {localHearings.filter(h=>myCases.some(c=>c.id===h.caseId)).length} | Warrants Reviewed: {wRequests.filter(r=>myCases.some(c=>c.id===r.caseId)&&r.status!=="PENDING").length} | Judicial Notes: {jNotes.filter(n=>myCases.some(c=>c.id===n.caseId)).length} | Documents Filed: {jDocs.filter(d=>myCases.some(c=>c.id===d.caseId)).length}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {}
      {tab === "auditlog" && (
        <div>
          <div className="alrt alrt-teal" style={{ marginBottom:12 }}>
            <strong>Immutable Judicial Audit Log</strong> — Stored separately from operational data. Tamper-resistant append-only record. All entries include Judge ID, IP, device metadata, and timestamp.
          </div>
          <div className="card">
            <div className="card-header">
              <span style={{ fontWeight:600 }}>Judicial Audit Log ({jAuditLog.length} entries)</span>
              <span className="badge bg-green" style={{ fontSize:9 }}>🛡 TAMPER-RESISTANT</span>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table className="tbl">
                <thead><tr><th>Entry ID</th><th>Timestamp</th><th>Judge</th><th>Judge ID</th><th>Action</th><th>Case ID</th><th>Detail</th><th>IP</th><th>Severity</th></tr></thead>
                <tbody>
                  {jAuditLog.filter(e => seniorJudge || e.judgeId === judgeId).map(e=>(
                    <tr key={e.id}>
                      <td><span className="mo tsm tdim">{e.id}</span></td>
                      <td><span className="tsm tdim" style={{ fontFamily:"'IBM Plex Mono',monospace" }}>{e.ts?.slice(0,19).replace("T"," ")}</span></td>
                      <td><span style={{ fontSize:12 }}>{e.judge}</span></td>
                      <td><span className="mo tsm tdim">{e.judgeId}</span></td>
                      <td><span className={`badge bg-${e.severity==="CRITICAL"?"red":e.severity==="HIGH"?"gold":"teal"}`} style={{ fontSize:9 }}>{e.action}</span></td>
                      <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{e.caseId}</span></td>
                      <td style={{ maxWidth:240, fontSize:11, color:"var(--dim)" }}>{e.detail}</td>
                      <td><span className="mo tsm tdim">{e.ip}</span></td>
                      <td><span className={`badge bg-${e.severity==="CRITICAL"?"red":e.severity==="HIGH"?"gold":"blue"}`}>{e.severity}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {}

      {}
      {mfaModal && (
        <div className="mo-ov">
          <div className="mo-box" style={{ maxWidth:380, border:"1px solid #5865F2" }}>
            <div className="mo-hd" style={{ background:"rgba(88,101,242,.15)" }}>
              <div>
                <div style={{ fontWeight:700 }}>🛡 Multi-Factor Authentication Required</div>
                <div className="tsm tdim">High-privilege judicial action requires MFA verification</div>
              </div>
              <button className="btn btn-xs btn-outline" onClick={()=>{setMfaModal(false);setMfaCode("");}}>✕</button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-teal" style={{ marginBottom:12, fontSize:11 }}>
                Enter your 6-digit judicial MFA code. This action will be recorded in the immutable judicial audit log with your Judge ID and timestamp.
              </div>
              <div className="fg">
                <label className="lbl">MFA Code</label>
                <input className="inp" type="password" maxLength={6} value={mfaCode}
                  onChange={e=>setMfaCode(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&confirmMfa()}
                  placeholder="Enter 6-digit code" style={{ fontFamily:"'IBM Plex Mono',monospace", letterSpacing:6, fontSize:18, textAlign:"center" }}/>
                <div className="tsm tdim" style={{ marginTop:4 }}>Demo code: 123456</div>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>{setMfaModal(false);setMfaCode("");}}>Cancel</button>
              <button className="btn btn-teal" onClick={confirmMfa}>🛡 Verify &amp; Proceed</button>
            </div>
          </div>
        </div>
      )}

      {}
      {showRulingModal && selectedCase && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd" style={{ background:"rgba(26,122,122,.12)", borderBottom:"1px solid var(--teal-d)" }}>
              <div>
                <div style={{ fontWeight:700 }}>📜 Record Official Verdict</div>
                <div className="tsm tdim">Case: {selectedCase.title} · Judge ID: {judgeId}</div>
              </div>
              <button className="btn btn-xs btn-outline" onClick={()=>setShowRulingModal(false)}>✕</button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-gold" style={{ marginBottom:12, fontSize:11 }}>
                This verdict will be permanently recorded, audit-logged, and cannot be modified without filing a formal appeal. MFA was verified for this action.
              </div>
              <div className="g2" style={{ gap:12 }}>
                <div className="fg">
                  <label className="lbl">Verdict *</label>
                  <select className="inp" value={rulingForm.verdict} onChange={e=>setRulingForm(p=>({...p,verdict:e.target.value}))}>
                    {["GUILTY","NOT_GUILTY","PARTIALLY_GUILTY","DISMISSED","MISTRIAL","ACQUITTED"].map(v=><option key={v} value={v}>{v.replace(/_/g," ")}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Sentence (if applicable)</label>
                  <input className="inp" value={rulingForm.sentence} onChange={e=>setRulingForm(p=>({...p,sentence:e.target.value}))} placeholder="e.g. 5 years imprisonment, probation…"/>
                </div>
                <div className="fg">
                  <label className="lbl">Fine / Compensation</label>
                  <input className="inp" value={rulingForm.fine} onChange={e=>setRulingForm(p=>({...p,fine:e.target.value}))} placeholder="e.g. $25,000, none"/>
                </div>
                <div className="fg">
                  <label className="lbl">Appeal Deadline</label>
                  <input className="inp" type="date" value={rulingForm.appealDeadline} onChange={e=>setRulingForm(p=>({...p,appealDeadline:e.target.value}))}/>
                </div>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Charges (one per line)</label>
                  {rulingForm.charges.map((ch,i)=>(
                    <div key={i} style={{ display:"flex", gap:6, marginBottom:6 }}>
                      <input className="inp" style={{ marginBottom:0, flex:1 }} value={ch}
                        onChange={e=>{const nc=[...rulingForm.charges];nc[i]=e.target.value;setRulingForm(p=>({...p,charges:nc}));}}
                        placeholder={`Charge ${i+1}`}/>
                      {rulingForm.charges.length > 1 && <button className="btn btn-xs btn-outline" onClick={()=>setRulingForm(p=>({...p,charges:p.charges.filter((_,j)=>j!==i)}))}>✕</button>}
                    </div>
                  ))}
                  <button className="btn btn-xs btn-outline" onClick={()=>setRulingForm(p=>({...p,charges:[...p.charges,""]}))}>+ Add Charge</button>
                </div>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Judicial Reasoning *</label>
                  <textarea className="inp" style={{ minHeight:90 }} value={rulingForm.reasoning}
                    onChange={e=>setRulingForm(p=>({...p,reasoning:e.target.value}))}
                    placeholder="Provide full legal reasoning, citing evidence, precedents, and applicable law…"/>
                </div>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowRulingModal(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={()=>recordVerdict(selectedCase)}>📜 Record Verdict Permanently</button>
            </div>
          </div>
        </div>
      )}

      {}
      {showNoteModal && selectedCase && (
        <div className="mo-ov">
          <div className="mo-box" style={{ maxWidth:520 }}>
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>🗒 Add Protected Judicial Note</div>
                <div className="tsm tdim">{selectedCase.title} — visible to judges only, immutable after filing</div>
              </div>
              <button className="btn btn-xs btn-outline" onClick={()=>setShowNoteModal(false)}>✕</button>
            </div>
            <div className="mo-bd">
              <div className="fg">
                <label className="lbl">Classification</label>
                <select className="inp" value={noteForm.classification} onChange={e=>setNoteForm(p=>({...p,classification:e.target.value}))}>
                  {["CONFIDENTIAL","RESTRICTED","TOP SECRET"].map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="lbl">Judicial Note *</label>
                <textarea className="inp" style={{ minHeight:100 }} value={noteForm.note}
                  onChange={e=>setNoteForm(p=>({...p,note:e.target.value}))}
                  placeholder="Enter protected judicial observation, instruction, or note…"/>
                <div className="tsm tdim" style={{ marginTop:4 }}>This note is protected and cannot be edited or viewed by lawyers, BA members, or administrative staff.</div>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowNoteModal(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={()=>addNote(selectedCase)}>🗒 File Protected Note</button>
            </div>
          </div>
        </div>
      )}

      {}
      {showDocModal && selectedCase && (
        <div className="mo-ov">
          <div className="mo-box" style={{ maxWidth:520 }}>
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>📁 Upload Judicial Document</div>
                <div className="tsm tdim">{selectedCase.title} — document will be hashed and encrypted</div>
              </div>
              <button className="btn btn-xs btn-outline" onClick={()=>setShowDocModal(false)}>✕</button>
            </div>
            <div className="mo-bd">
              <div className="g2" style={{ gap:12 }}>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Document Name *</label>
                  <input className="inp" value={docForm.name} onChange={e=>setDocForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Pre-Trial Order — State v. Donovan"/>
                </div>
                <div className="fg">
                  <label className="lbl">Document Type</label>
                  <select className="inp" value={docForm.type} onChange={e=>setDocForm(p=>({...p,type:e.target.value}))}>
                    {["COURT_ORDER","JUDGMENT","WARRANT","INJUNCTION","SUBPOENA","RULING","INTERLOCUTORY","DECREE"].map(t=><option key={t} value={t}>{t.replace(/_/g," ")}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Classification</label>
                  <select className="inp" value={docForm.classification} onChange={e=>setDocForm(p=>({...p,classification:e.target.value}))}>
                    {["CONFIDENTIAL","RESTRICTED","TOP SECRET"].map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="alrt alrt-teal" style={{ marginTop:10, fontSize:11 }}>
                Document will receive SHA-256 hash, digital judicial signature, and encrypted storage record. Upload audit entry will be generated.
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowDocModal(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={()=>uploadDoc(selectedCase)}>📁 File Document</button>
            </div>
          </div>
        </div>
      )}

      {}
      {showHearingModal && selectedCase && (
        <div className="mo-ov">
          <div className="mo-box" style={{ maxWidth:480 }}>
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>📅 Schedule Hearing</div>
                <div className="tsm tdim">{selectedCase.title}</div>
              </div>
              <button className="btn btn-xs btn-outline" onClick={()=>setShowHearingModal(false)}>✕</button>
            </div>
            <div className="mo-bd">
              <div className="g2" style={{ gap:12 }}>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Hearing Title *</label>
                  <input className="inp" value={hearingForm.title} onChange={e=>setHearingForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Pre-Trial Hearing — State v. Donovan"/>
                </div>
                <div className="fg">
                  <label className="lbl">Type</label>
                  <select className="inp" value={hearingForm.type} onChange={e=>setHearingForm(p=>({...p,type:e.target.value}))}>
                    {["TRIAL","PRETRIAL","BAIL","MOTION","SENTENCING","APPEAL","EMERGENCY"].map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Courtroom</label>
                  <select className="inp" value={hearingForm.room} onChange={e=>setHearingForm(p=>({...p,room:e.target.value}))}>
                    {["Courtroom 1","Courtroom 2","Courtroom 3","Courtroom 4","Courtroom 5","Courtroom 6"].map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Date *</label>
                  <input className="inp" type="date" value={hearingForm.date} onChange={e=>setHearingForm(p=>({...p,date:e.target.value}))}/>
                </div>
                <div className="fg">
                  <label className="lbl">Time</label>
                  <input className="inp" type="time" value={hearingForm.time} onChange={e=>setHearingForm(p=>({...p,time:e.target.value}))}/>
                </div>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowHearingModal(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={()=>scheduleHearing(selectedCase)}>📅 Schedule Hearing</button>
            </div>
          </div>
        </div>
      )}

      {}
      {lockConfirmCase && (
        <div className="mo-ov">
          <div className="mo-box" style={{ maxWidth:440 }}>
            <div className="mo-hd">
              <div style={{ fontWeight:700, color:"#e07a6e" }}>🔒 Lock Case — Final Action</div>
              <button className="btn btn-xs btn-outline" onClick={()=>setLockConfirmCase(null)}>✕</button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-red">
                <strong>Warning — Irreversible Action:</strong> Locking this case will transition it to CLOSED status and prevent all further modifications. Only a formal appeal process can reopen a locked case.
              </div>
              <div style={{ marginTop:12, padding:"10px 14px", background:"var(--surf)", borderRadius:6, border:"1px solid var(--b1)" }}>
                <div style={{ fontWeight:700 }}>{lockConfirmCase.title}</div>
                <div className="tsm tdim">{lockConfirmCase.id} · {lockConfirmCase.type}</div>
              </div>
              <div style={{ marginTop:10, fontSize:12, color:"var(--dim)" }}>
                This action will be recorded as a CRITICAL-severity entry in the immutable judicial audit log including your Judge ID, timestamp, and session metadata.
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setLockConfirmCase(null)}>Cancel</button>
              <button className="btn btn-sm" style={{ background:"rgba(224,122,110,.2)", color:"#e07a6e", border:"1px solid rgba(224,122,110,.4)" }}
                onClick={()=>lockCase(lockConfirmCase)}>
                🔒 Lock Case Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {showAppealModal && selectedCase && (
        <div className="mo-ov">
          <div className="mo-box" style={{ maxWidth:480 }}>
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>⚖ File Appeal — {selectedCase.id}</div>
                <div className="tsm tdim">Formal appeal process to reopen locked case</div>
              </div>
              <button className="btn btn-xs btn-outline" onClick={()=>setShowAppealModal(false)}>✕</button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-gold">
                Appeals must be reviewed and approved by a General Judge or higher. Filing an appeal generates an audit entry and notifies the Chief of DOJ.
              </div>
              <div className="fg" style={{ marginTop:12 }}>
                <label className="lbl">Grounds for Appeal</label>
                <textarea className="inp" style={{ minHeight:80 }} placeholder="State the legal basis for this appeal, citing applicable law and new evidence if available…"/>
              </div>
              <div className="fg">
                <label className="lbl">Requesting Party</label>
                <input className="inp" placeholder="Plaintiff / Defendant / State"/>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowAppealModal(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={()=>{judicialAudit("APPEAL_FILED",selectedCase.id,"Formal appeal filed. Pending review by senior judicial authority.","HIGH");toast("Appeal filed — pending senior judicial review","success");setShowAppealModal(false);}}>⚖ File Appeal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PrecedentsPage = () => (
  <SimplePage title="Legal Precedents" sub="Case law archive and judicial precedent database">
    <div style={{ display:"grid", gap:11 }}>
      {[
        { id:"PREC-001", title:"Rights of Accused — Presumption of Innocence", court:"Supreme Court", date:"2019-03-14", citation:"DOJ-SC-2019-041", summary:"All accused persons are presumed innocent until proven guilty beyond reasonable doubt. This principle supersedes public perception and media coverage." },
        { id:"PREC-002", title:"Evidence Admissibility — Chain of Custody",    court:"Appeals Court", date:"2021-07-22", citation:"DOJ-AC-2021-088", summary:"Evidence must maintain unbroken chain of custody from collection to court presentation. Any gap renders the evidence inadmissible." },
        { id:"PREC-003", title:"Warrant Requirement — Digital Communications",  court:"Supreme Court", date:"2023-01-08", citation:"DOJ-SC-2023-012", summary:"Digital communications, including encrypted messages and metadata, require a valid search warrant before law enforcement access." },
      ].map(p=>(
        <div key={p.id} className="card">
          <div className="card-body">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, marginBottom:4 }}>{p.title}</div>
                <div className="txs tdim" style={{ marginBottom:8 }}>{p.court} · {p.date} · <span className="mo">{p.citation}</span></div>
                <p style={{ fontSize:13, color:"var(--mid)", lineHeight:1.7 }}>{p.summary}</p>
              </div>
              <button className="pdf-btn"><Ico n="download" s={11}/>PDF</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </SimplePage>
);

const CitizensPage = ({ user }) => {
  if (!hasPerm(user?.role, "CITIZEN_VIEW")) return (<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:320,gap:16}}>
    <div style={{fontSize:48}}>🔒</div>
    <div style={{fontWeight:700,fontSize:18,color:"var(--teal-l)",letterSpacing:"1px"}}>ACCESS RESTRICTED</div>
    <div style={{color:"var(--dim)",fontSize:13,textAlign:"center",maxWidth:380,lineHeight:1.7}}>
      This section is restricted to verified Department of Justice personnel only.<br/>
      Your current role (<strong style={{color:"var(--gold-l)"}}>{ROLES[user?.role]?.label||user?.role}</strong>) does not have the required permissions.
    </div>
    <div style={{fontSize:11,color:"var(--dim)",background:"var(--surf)",border:"1px solid var(--b1)",padding:"8px 16px",borderRadius:"var(--radius)",fontFamily:"'IBM Plex Mono',monospace"}}>
      ERR_ACCESS_DENIED · {user?.role||"UNAUTHENTICATED"} · {new Date().toISOString().slice(0,19)}Z
    </div>
  </div>);
  return (
  <SimplePage title="Citizen Profiles" sub="Population registry and identity management">
    <div className="card" style={{ overflowX:"auto" }}>
      <table className="tbl">
        <thead><tr><th>ID</th><th>Name</th><th>DOB</th><th>Address</th><th>Clearance</th><th>Cases</th></tr></thead>
        <tbody>
          {[
            { id:"CIT-001", name:"Marcus L. Donovan", dob:"1988-03-22", addr:"14 Eastside Ave, Los Santos", cl:"RESTRICTED", cases:2 },
            { id:"CIT-002", name:"Elena Whitmore",    dob:"1965-09-10", addr:"Vinewood Hills Estate",       cl:"CLEAR",      cases:1 },
            { id:"CIT-003", name:"Ramon Castellan",   dob:"1975-07-09", addr:"44 Prestige Ave",             cl:"RESTRICTED", cases:2 },
            { id:"CIT-004", name:"Laura Haines",      dob:"1992-11-03", addr:"220 Grove St",               cl:"CLEAR",      cases:1 },
          ].map(c=>(
            <tr key={c.id}>
              <td className="mo txs tdim">{c.id}</td>
              <td style={{ fontWeight:600 }}>{c.name}</td>
              <td className="tsm">{c.dob}</td>
              <td className="tsm tmid">{c.addr}</td>
              <td><span className={`badge bg-${c.cl==="CLEAR"?"green":"red"}`}>{c.cl}</span></td>
              <td className="mo tsm">{c.cases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </SimplePage>
  );
};

const CaseFoldersPage = ({ user, cases }) => {
  if (!hasPerm(user?.role, "CASE_FOLDER_VIEW")) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,gap:16,padding:32}}>
      <div style={{fontSize:52}}>🔒</div>
      <div style={{fontWeight:700,fontSize:20,color:"var(--teal-l)",letterSpacing:"1px"}}>ACCESS RESTRICTED</div>
      <div style={{color:"var(--dim)",fontSize:13,textAlign:"center",maxWidth:400,lineHeight:1.8}}>
        This section is restricted to verified DOJ personnel only. Your role
        (<strong style={{color:"var(--gold-l)"}}>{ROLES[user?.role]?.label||user?.role||"None"}</strong>) does not have the required permissions.
      </div>
      <div style={{fontSize:11,color:"var(--dim)",background:"var(--surf)",border:"1px solid var(--b1)",padding:"8px 18px",borderRadius:"var(--radius)",fontFamily:"'IBM Plex Mono',monospace"}}>
        ERR_ACCESS_DENIED · {user?.role||"UNAUTHENTICATED"} · {new Date().toISOString().slice(0,19)}Z
      </div>
    </div>
  );
  return (
  <SimplePage title="Case Folders" sub="Organized case file storage and retrieval">
    <div className="g3" style={{ gap:13 }}>
      {cases.map(c=>(
        <div key={c.id} className="card" style={{ cursor:"pointer" }}>
          <div className="card-body">
            <div style={{ marginBottom:8 }}><Ico n="clipboard" s={20} c="var(--teal-d)"/></div>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:4 }}>{c.title}</div>
            <div className="txs tdim mo" style={{ marginBottom:8 }}>{c.id}</div>
            <div style={{ display:"flex", gap:6 }}>{statusBadge(c.status)}{priorityBadge(c.priority)}</div>
            <div className="txs tdim" style={{ marginTop:8 }}>Filed: {c.filed}</div>
          </div>
        </div>
      ))}
    </div>
  </SimplePage>
)
};

const LegalDocsPage = ({ user }) => {
  if (!hasPerm(user?.role, "LEGAL_DOC_VIEW")) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,gap:16,padding:32}}>
      <div style={{fontSize:52}}>🔒</div>
      <div style={{fontWeight:700,fontSize:20,color:"var(--teal-l)",letterSpacing:"1px"}}>ACCESS RESTRICTED</div>
      <div style={{color:"var(--dim)",fontSize:13,textAlign:"center",maxWidth:400,lineHeight:1.8}}>
        This section is restricted to verified DOJ personnel only. Your role
        (<strong style={{color:"var(--gold-l)"}}>{ROLES[user?.role]?.label||user?.role||"None"}</strong>) does not have the required permissions.
      </div>
      <div style={{fontSize:11,color:"var(--dim)",background:"var(--surf)",border:"1px solid var(--b1)",padding:"8px 18px",borderRadius:"var(--radius)",fontFamily:"'IBM Plex Mono',monospace"}}>
        ERR_ACCESS_DENIED · {user?.role||"UNAUTHENTICATED"} · {new Date().toISOString().slice(0,19)}Z
      </div>
    </div>
  );
  return (
  <SimplePage title="Legal Documents" sub="Official legal filings and government documents">
    <div className="alrt alrt-teal" style={{ marginBottom:14 }}>All documents are cryptographically signed and immutable once filed.</div>
    <DocumentsPage user={{role:"ADMIN"}}/>
  </SimplePage>
)
};

const AuthScreen = ({ onLogin }) => {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [regRole, setRegRole] = useState("CITIZEN");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(INIT_USERS);

  const login = () => {
    setError(""); setLoading(true);
    const now = Date.now();
    const attempts = JSON.parse(sessionStorage.getItem("login_attempts_"+username)||"[]");
    const recent = attempts.filter(t => now - t < 5*60*1000);
    if (recent.length >= 5) {
      setError("Too many login attempts. Wait 5 minutes and try again.");
      setLoading(false); return;
    }
    sessionStorage.setItem("login_attempts_"+username, JSON.stringify([...recent, now]));
    setTimeout(() => {
      const u = users.find(x => x.username === username && x.password === password);
      if (!u || !u.active) {
        setError(u && !u.active ? "Account suspended. Contact your administrator." : "Invalid credentials.");
        setLoading(false); return;
      }
      if (u.username !== "admin") {
        const serverCheck = verifyServerMembership(u.username);
        if (!serverCheck.authorized) {
          setError("Access denied: " + serverCheck.reason);
          setLoading(false); return;
        }
        if (serverCheck.resolvedRole && serverCheck.resolvedRole !== u.role) {
          u.role = serverCheck.resolvedRole;
        }
      }
      sessionStorage.removeItem("login_attempts_"+username);
      const loginTs = new Date().toISOString();
      const sessionUser = { ...u, token:mkToken(u), sessionStart:loginTs, loginIp:"10.0."+Math.floor(Math.random()*3+1)+"."+Math.floor(Math.random()*200+10), sessionId:"SID-"+Date.now(), authMethod:"standard" };
      onLogin(sessionUser);
      setLoading(false);
    }, 600);
  };

  const register = () => {
    setError("");
    if (!username || !password || !email) { setError("All fields required."); return; }
    if (users.find(u => u.username === username)) { setError("Username already taken."); return; }
    setLoading(true);
    setTimeout(() => {
      const regCheck = verifyServerMembership(username);
      if (!regCheck.authorized && username !== "admin") {
        setError("Registration denied: " + regCheck.reason + " Only verified members of DOJ Discord server " + DOJ_DISCORD_SERVER_ID + " may register.");
        setLoading(false); return;
      }
      const assignedRole = regCheck.authorized ? regCheck.resolvedRole : regRole;
      const nu = { id:`USR-${String(users.length+1).padStart(3,"0")}`, username, password, role:assignedRole, email, discordId:username, active:true, joined:new Date().toISOString().slice(0,10), phone:"", bio:"" };
      setUsers(p => [...p, nu]);
      setMode("login"); setError(""); setLoading(false);
      toast("Account created — Discord server membership verified","success");
    }, 500);
  };

  const [discordModal, setDiscordModal] = useState(false);
  const [discordName, setDiscordName] = useState("");
  const [discordStep, setDiscordStep] = useState(1); // 1=enter, 2=verifying, 3=success
  const [discordResult, setDiscordResult] = useState(null);
  const [discordError, setDiscordError] = useState("");

  const DISCORD_PAYLOADS = {
    "_n2a":        { roles:["Chief of DOJ","Administrator"],          avatar:"👑", verified:true },
    "abo3th":      { roles:["Deputy of DOJ"],                         avatar:"⭐", verified:true },
    "z.th":        { roles:["Senior Lawyer","Judge"],                 avatar:"⚖",  verified:true },
    "sultan13579": { roles:["Head of Bar Association"],               avatar:"🏛", verified:true },
    "y3_4":        { roles:["Bar Association Supervisor"],            avatar:"📋", verified:true },
    "albsof0556":  { roles:["Bar Association Supervisor"],            avatar:"📋", verified:true },
    "abo3th":      { roles:["Deputy of DOJ"],                         avatar:"⭐", verified:true },
    "K3Q8":        { roles:["Judge"],                                 avatar:"⚖",  verified:true },
    "o.s45":       { roles:["Senior Lawyer"],                         avatar:"⚖",  verified:true },
    "df_511":      { roles:["Senior Lawyer"],                         avatar:"⚖",  verified:true },
    "l3pd":        { roles:["Senior Lawyer"],                         avatar:"⚖",  verified:true },
    "ay_mnx":      { roles:["Lawyer"],                                avatar:"📄", verified:true },
    "cvv1":        { roles:["Lawyer"],                                avatar:"📄", verified:true },
    "az511az":     { roles:["Lawyer"],                                avatar:"📄", verified:true },
    "g.lok_":      { roles:["Lawyer"],                                avatar:"📄", verified:true },
    "lcfeer":      { roles:["Lawyer"],                                avatar:"📄", verified:true },
    "rrb6":        { roles:["Lawyer"],                                avatar:"📄", verified:true },
    "t10x":        { roles:["Training Lawyer"],                       avatar:"📘", verified:true },
    "ez.95":       { roles:["Training Lawyer"],                       avatar:"📘", verified:true },
    "gilrx":       { roles:["Training Lawyer"],                       avatar:"📘", verified:true },
  };

  const discordLogin = () => { setDiscordModal(true); setDiscordStep(1); setDiscordName(""); setDiscordError(""); setDiscordResult(null); };

  const handleDiscordAuth = () => {
    setDiscordError("");
    if (!discordName.trim()) { setDiscordError("Enter your Discord username"); return; }
    setDiscordStep(2);
    setTimeout(() => {
      const verification = verifyServerMembership(discordName.trim());

      if (!verification.authorized) {
        setDiscordError(verification.reason);
        setDiscordStep(1);
        return;
      }

      const { memberKey, member, resolvedRole } = verification;

      const match = INIT_USERS.find(u =>
        (u.discordId && u.discordId.toLowerCase() === memberKey.toLowerCase()) ||
        u.username.toLowerCase() === memberKey.toLowerCase()
      );

      const account = match || {
        id:"USR-D"+Date.now(), username:memberKey, password:"",
        role:resolvedRole, email:"", discordId:memberKey,
        active:true, joined:new Date().toISOString().slice(0,10),
        phone:"", bio:"Verified Discord member", citizenId:"",
        charName:memberKey, points:0, section:"", badge:false,
      };

      const idx = INIT_USERS.findIndex(u => u.id === account.id);
      if (idx >= 0) INIT_USERS[idx] = { ...INIT_USERS[idx], role: resolvedRole };

      setDiscordResult({
        account, resolvedRole,
        discordRoles: member.roles || [],
        serverId: DOJ_DISCORD_SERVER_ID,
        serverName: DOJ_DISCORD_SERVER_NAME,
        avatar: member.avatar || "👤",
        memberKey,
      });
      setDiscordStep(3);
    }, 1600);
  };

  const completeDiscordLogin = () => {
    if (!discordResult) return;
    const { account, resolvedRole, discordRoles, avatar, serverId, serverName, memberKey } = discordResult;

    const recheck = verifyServerMembership(memberKey);
    if (!recheck.authorized) {
      setDiscordError("Access revoked: " + recheck.reason);
      setDiscordStep(1);
      setDiscordResult(null);
      return;
    }

    const sessionUser = {
      ...account,
      role: resolvedRole,
      discordVerified:   true,
      discordServerId:   serverId,       // 1227422529656983582
      discordServerName: serverName,
      discordMemberKey:  memberKey,
      discordRoles:      discordRoles,
      discordAvatar:     avatar,
      sessionStart:      new Date().toISOString(),
      sessionId:         "SID-" + Date.now(),
      authMethod:        "discord_server_verified",
      revokeOnLogout:    true,
    };

    if (typeof setAuditLog === "function") {
      const auditTs = new Date().toISOString();
      setAuditLog(prev => [
        {
          id: "AUD-DL-" + Date.now(),
          ts: auditTs,
          actor: memberKey,
          action: "DISCORD_LOGIN",
          ref: sessionUser.sessionId,
          detail: `Discord login: ${memberKey} authenticated via server ${DOJ_DISCORD_SERVER_ID}. All 4 membership gates passed. Session ${sessionUser.sessionId} created.`,
          type: "auth",
          severity: "HIGH",
          ip: "10.0.1." + Math.floor(Math.random() * 200 + 10),
        },
        {
          id: "AUD-RA-" + (Date.now() + 1),
          ts: auditTs,
          actor: "SYSTEM (Discord Sync)",
          action: "ROLE_ASSIGNED",
          ref: memberKey,
          detail: `Role auto-assigned from Discord server ${DOJ_DISCORD_SERVER_ID}: Discord roles [${(recheck.discordRoles || []).join(", ")}] → Platform role: ${resolvedRole}. Assignment is immutable until Discord role changes.`,
          type: "auth",
          severity: "HIGH",
          ip: "10.0.0.1",
        },
        ...prev.slice(0, 498),
      ]);
    }
    toast("✓ Server verified — Welcome, " + (account.charName || memberKey), "success");
    onLogin({ ...sessionUser, token: mkToken(sessionUser) });
    setDiscordModal(false);
  };

  return (
    <div className="auth-bg">
      <style>{`
        .auth-bg * { box-sizing:border-box; }
        .w-full { width:100%; }
      `}</style>
      <div style={{ width:"100%", maxWidth:420 }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <img src={SEAL_B64} alt="DOJ" style={{ width:72, height:72, objectFit:"contain", filter:"drop-shadow(0 0 14px rgba(26,122,122,.5))" }}/>
          <div className="pf" style={{ fontSize:18, color:"var(--teal-l)", letterSpacing:"2px", marginTop:12 }}>DEPARTMENT OF JUSTICE</div>
          <div style={{ fontSize:9, color:"var(--dim)", letterSpacing:"3px", marginTop:4 }}>LOS SANTOS · OUTLAW · SECURE PORTAL</div>
        </div>
        <div className="auth-card">
          <div className="auth-header">
            <div style={{ fontSize:11, color:"var(--mid)", letterSpacing:"1.5px", textTransform:"uppercase" }}>Official Government System</div>
            <div style={{ fontSize:11, color:"var(--dim)", marginTop:8 }}>Unauthorized access is a criminal offence and will be prosecuted.</div>
          </div>
          <div style={{ padding:"22px 24px" }}>
            <div className="auth-tabs">
              <div className={`auth-tab${mode==="login"?" active":""}`} onClick={()=>{setMode("login");setError("");}}>Sign In</div>
              <div className={`auth-tab${mode==="register"?" active":""}`} onClick={()=>{setMode("register");setError("");}}>Register</div>
            </div>
            {error && <div className="alrt alrt-red">{error}</div>}
            <div className="fg"><label className="lbl">Username</label><input className="inp" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Enter username" onKeyDown={e=>e.key==="Enter"&&login()}/></div>
            {mode==="register" && <div className="fg"><label className="lbl">Email</label><input className="inp" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@doj.gov"/></div>}
            <div className="fg"><label className="lbl">Password</label><input className="inp" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&login()}/></div>
            {mode==="register" && (
              <div className="fg">
                <label className="lbl">Requested Role</label>
                <select className="inp" value={regRole} onChange={e=>setRegRole(e.target.value)}><option value="CITIZEN">Citizen</option><option value="TRAINEE">Trainee Lawyer</option><option value="LAWYER">Lawyer</option></select>
                <div className="txs tdim" style={{ marginTop:4 }}>Elevated roles require Admin approval.</div>
              </div>
            )}
            <button className="btn btn-teal" style={{ width:"100%", justifyContent:"center" }} onClick={mode==="login"?login:register} disabled={loading}>
              {loading?"Processing…":mode==="login"?"Sign In":"Create Account"}
            </button>
            <div className="auth-divider"><span/><p>or</p><span/></div>
            <button className="discord-btn" onClick={discordLogin} disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 71 55" fill="#fff"><path d="M60.1 4.9A58.5 58.5 0 0045.7.44a.22.22 0 00-.23.11 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.23 0 37.4 37.4 0 00-1.83-3.7.23.23 0 00-.23-.11A58.2 58.2 0 0010.9 4.9a.21.21 0 00-.1.08C1.6 18.1-.96 30.9.3 43.6a.24.24 0 00.09.16 58.8 58.8 0 0017.7 8.95.23.23 0 00.25-.08 42 42 0 003.6-5.88.23.23 0 00-.12-.32 38.7 38.7 0 01-5.53-2.64.23.23 0 01-.02-.38 30.4 30.4 0 001.1-.86.22.22 0 01.23-.03c11.6 5.3 24.14 5.3 35.6 0a.22.22 0 01.23.03c.37.3.73.58 1.1.86a.23.23 0 01-.02.38 36.4 36.4 0 01-5.54 2.63.23.23 0 00-.12.33 47.1 47.1 0 003.6 5.87.23.23 0 00.25.08 58.6 58.6 0 0017.73-8.95.23.23 0 00.09-.16c1.47-15.2-2.47-28-10.47-39.54a.18.18 0 00-.09-.09zM23.73 36.12c-3.5 0-6.38-3.21-6.38-7.16s2.83-7.16 6.38-7.16c3.57 0 6.42 3.24 6.38 7.16 0 3.95-2.84 7.16-6.38 7.16zm23.6 0c-3.5 0-6.38-3.21-6.38-7.16s2.83-7.16 6.38-7.16c3.57 0 6.42 3.24 6.38 7.16 0 3.95-2.81 7.16-6.38 7.16z"/></svg>
              Sign in with Discord
            </button>

            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:10, color:"var(--dim)", letterSpacing:"1.2px", textTransform:"uppercase", textAlign:"center", marginBottom:8 }}>Staff Credentials</div>
              <div style={{ background:"var(--surf)", border:"1px solid var(--b1)", borderRadius:"var(--radius)", overflow:"auto", maxHeight:180 }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
                  <thead><tr style={{ borderBottom:"1px solid var(--b1)" }}><th style={{ padding:"6px 10px", textAlign:"left", color:"var(--dim)", fontWeight:600, fontSize:10, letterSpacing:".5px" }}>Username</th><th style={{ padding:"6px 10px", textAlign:"left", color:"var(--dim)", fontWeight:600, fontSize:10, letterSpacing:".5px" }}>Password</th><th style={{ padding:"6px 10px", textAlign:"left", color:"var(--dim)", fontWeight:600, fontSize:10, letterSpacing:".5px" }}>Role</th></tr></thead>
                  <tbody>
                    {[
                      ["admin","admin123","System Administrator"],
                      ["_n2a","chief123","Chief of DOJ ⭐⭐⭐⭐⭐⭐"],
                      ["abo3th","dep123","Deputy Chief ⭐⭐⭐⭐⭐"],
                      ["abo3th_judge","judge123","Judge — Urgent Court"],
                      ["z.th_judge","judge123","Judge — Urgent Court"],
                      ["K3Q8","judge123","Judge — Urgent Court"],
                      ["sultan13579","bar123","Head of Bar Association"],
                      ["y3_4","bar123","BA Supervisor"],
                      ["albsof0556","bar123","BA Supervisor"],
                      ["z.th","atty123","Senior Lawyer"],
                      ["o.s45","atty123","Senior Lawyer"],
                      ["df_511","atty123","Senior Lawyer"],
                      ["l3pd","atty123","Senior Lawyer"],
                      ["ay_mnx","atty123","Lawyer"],
                      ["cvv1","atty123","Lawyer"],
                      ["az511az","atty123","Lawyer"],
                      ["g.lok_","atty123","Lawyer"],
                      ["lcfeer","atty123","Lawyer"],
                      ["rrb6","atty123","Lawyer"],
                      ["t10x","train123","Training Lawyer"],
                      ["ez.95","train123","Training Lawyer"],
                      ["gilrx","train123","Training Lawyer"],
                    ].map(([u,p,r])=>(
                      <tr key={u} style={{ borderBottom:"1px solid var(--b1)", cursor:"pointer" }} onClick={()=>{setUsername(u);setPassword(p);}}>
                        <td style={{ padding:"5px 10px", fontFamily:"'IBM Plex Mono',monospace", color:"var(--teal-l)", fontSize:11 }}>{u}</td>
                        <td style={{ padding:"5px 10px", fontFamily:"'IBM Plex Mono',monospace", color:"var(--gold-l)", fontSize:11 }}>{p}</td>
                        <td style={{ padding:"5px 10px", color:"var(--mid)", fontSize:11 }}>{r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ fontSize:10, color:"var(--dim)", textAlign:"center", marginTop:6 }}>Click any row to auto-fill credentials</div>
            </div>
          </div>
        </div>
        <div style={{ textAlign:"center", marginTop:14 }}>
          <button className="btn btn-outline btn-sm" onClick={()=>document.dispatchEvent(new CustomEvent("showPublic"))}>
            <Ico n="globe" s={13}/>Public Case Lookup
          </button>
        </div>
      </div>

      {}
      {discordModal && (
        <div className="mo-ov">
          <div className="mo-box" style={{ maxWidth:400 }}>
            {}
            <div className="mo-hd" style={{ background:"#5865F2", borderRadius:"var(--radius) var(--radius) 0 0", padding:"16px 20px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <svg width="22" height="22" viewBox="0 0 71 55" fill="#fff"><path d="M60.1 4.9A58.5 58.5 0 0045.7.44a.22.22 0 00-.23.11 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.23 0 37.4 37.4 0 00-1.83-3.7.23.23 0 00-.23-.11A58.2 58.2 0 0010.9 4.9a.21.21 0 00-.1.08C1.6 18.1-.96 30.9.3 43.6a.24.24 0 00.09.16 58.8 58.8 0 0017.7 8.95.23.23 0 00.25-.08 42 42 0 003.6-5.88.23.23 0 00-.12-.32 38.7 38.7 0 01-5.53-2.64.23.23 0 01-.02-.38 30.4 30.4 0 001.1-.86.22.22 0 01.23-.03c11.6 5.3 24.14 5.3 35.6 0a.22.22 0 01.23.03c.37.3.73.58 1.1.86a.23.23 0 01-.02.38 36.4 36.4 0 01-5.54 2.63.23.23 0 00-.12.33 47.1 47.1 0 003.6 5.87.23.23 0 00.25.08 58.6 58.6 0 0017.73-8.95.23.23 0 00.09-.16c1.47-15.2-2.47-28-10.47-39.54a.18.18 0 00-.09-.09zM23.73 36.12c-3.5 0-6.38-3.21-6.38-7.16s2.83-7.16 6.38-7.16c3.57 0 6.42 3.24 6.38 7.16 0 3.95-2.84 7.16-6.38 7.16zm23.6 0c-3.5 0-6.38-3.21-6.38-7.16s2.83-7.16 6.38-7.16c3.57 0 6.42 3.24 6.38 7.16 0 3.95-2.81 7.16-6.38 7.16z"/></svg>
                <div>
                <div style={{ color:"#fff", fontWeight:700, fontSize:15 }}>Discord Authentication</div>
                <div style={{ color:"rgba(255,255,255,.65)", fontSize:10, marginTop:2, letterSpacing:"1px" }}>SERVER 1227422529656983582 · MEMBERS ONLY</div>
              </div>
              </div>
              <button className="btn btn-xs" style={{ background:"rgba(255,255,255,.15)", color:"#fff", border:"none" }} onClick={()=>setDiscordModal(false)}>✕</button>
            </div>

            <div className="mo-bd" style={{ padding:"20px" }}>
              {}
              <div style={{ display:"flex", gap:0, marginBottom:20, borderRadius:6, overflow:"hidden", border:"1px solid var(--b1)" }}>
                {["Enter Username","Verify Roles","Access Granted"].map((s,i) => (
                  <div key={i} style={{ flex:1, padding:"8px 4px", textAlign:"center", fontSize:10, fontWeight:600, letterSpacing:".5px", background: discordStep > i+1 ? "var(--teal-d)" : discordStep === i+1 ? "rgba(26,122,122,.2)" : "var(--surf)", color: discordStep > i+1 ? "var(--teal-l)" : discordStep === i+1 ? "var(--teal-l)" : "var(--dim)", borderRight: i<2 ? "1px solid var(--b1)" : "none", transition:"all .3s" }}>
                    {discordStep > i+1 ? "✓ " : ""}{s}
                  </div>
                ))}
              </div>

              {}
              {discordStep === 1 && (
                <div>
                  <div style={{ fontSize:13, color:"var(--mid)", marginBottom:14, lineHeight:1.6 }}>
                    Sign in with your Discord username. Your account will be verified against the <span style={{ color:"var(--teal-l)", fontWeight:600 }}>DOJ server (ID: 1227422529656983582)</span> and your platform role synced automatically from your server roles.
                  </div>
                  {discordError && <div className="alrt alrt-red" style={{ marginBottom:12 }}>{discordError}</div>}
                  <div className="fg">
                    <label className="lbl">Discord Username</label>
                    <input className="inp" value={discordName} onChange={e=>setDiscordName(e.target.value)}
                      placeholder="e.g. _n2a, z.th, sultan13579…"
                      onKeyDown={e=>e.key==="Enter"&&handleDiscordAuth()}
                      autoFocus/>
                  </div>
                  <div style={{ background:"rgba(88,101,242,.08)", border:"1px solid rgba(88,101,242,.3)", borderRadius:"var(--radius)", padding:"10px 13px", fontSize:11, color:"var(--mid)", marginBottom:14, lineHeight:1.7 }}>
                    🔒 <strong style={{ color:"var(--teal-l)" }}>Server-locked access.</strong> Only members of Discord server <span style={{ fontFamily:"'IBM Plex Mono',monospace", color:"#7289da" }}>1227422529656983582</span> may proceed. Roles are read-only and sync dynamically. Logout permanently revokes your session.
                  </div>
                  {}
                  <div style={{ fontSize:10, color:"var(--dim)", marginBottom:6, textTransform:"uppercase", letterSpacing:"1px" }}>Known Discord accounts</div>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                    {["_n2a","abo3th","sultan13579","z.th","y3_4","albsof0556","K3Q8","ay_mnx","t10x"].map(u => (
                      <button key={u} className="btn btn-outline btn-xs" onClick={()=>setDiscordName(u)}
                        style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10 }}>{u}</button>
                    ))}
                  </div>
                </div>
              )}

              {}
              {discordStep === 2 && (
                <div style={{ textAlign:"center", padding:"30px 0" }}>
                  <div style={{ fontSize:32, marginBottom:12, animation:"spin 1s linear infinite" }}>⟳</div>
                  <div style={{ fontWeight:600, fontSize:14, marginBottom:6 }}>Verifying server membership…</div>
                  <div className="tsm tdim" style={{ lineHeight:1.7 }}>
                    Checking <span style={{ color:"var(--teal-l)", fontFamily:"'IBM Plex Mono',monospace" }}>{discordName}</span> against
                    DOJ server <span style={{ color:"#7289da", fontFamily:"'IBM Plex Mono',monospace" }}>1227422529656983582</span>
                  </div>
                  <div style={{ marginTop:12, fontSize:10, color:"var(--dim)", letterSpacing:"1px" }}>
                    CHECKING GUILD MEMBERSHIP · READING ROLES · MAPPING PERMISSIONS
                  </div>
                  <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                </div>
              )}

              {}
              {discordStep === 3 && discordResult && (
                <div>
                  <div style={{ textAlign:"center", marginBottom:16 }}>
                    <div style={{ fontSize:40, marginBottom:6 }}>{discordResult.payload?.avatar || "👤"}</div>
                    <div style={{ fontWeight:700, fontSize:16 }}>{discordResult.account.charName || discordName}</div>
                    <div className="mo tsm" style={{ color:"var(--teal-l)" }}>{discordName}</div>
                  </div>
                  <div style={{ background:"rgba(26,122,122,.08)", border:"1px solid rgba(26,122,122,.25)", borderRadius:"var(--radius)", padding:"12px 14px", marginBottom:14 }}>
                    <div style={{ fontSize:11, fontWeight:600, color:"var(--teal-l)", textTransform:"uppercase", letterSpacing:"1px", marginBottom:8 }}>Discord Server Roles Detected</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
                      {(discordResult.discordRoles||[]).map(r => (
                        <span key={r} style={{ fontSize:11, background:"rgba(88,101,242,.2)", color:"#7289da", padding:"3px 8px", borderRadius:3, border:"1px solid rgba(88,101,242,.3)" }}>@{r}</span>
                      ))}
                      {(discordResult.discordRoles||[]).length===0 && <span className="tsm tdim">No DOJ roles found</span>}
                    </div>
                    <div style={{ fontSize:11, color:"var(--dim)", borderTop:"1px solid var(--b1)", paddingTop:8 }}>
                      Platform role assigned: <span className={`badge bg-${ROLES[discordResult.resolvedRole]?.color||"gray"}`}>{ROLES[discordResult.resolvedRole]?.label||discordResult.resolvedRole}</span>
                    </div>
                    <div style={{ marginTop:8, fontSize:10, color:"var(--teal-l)", display:"flex", alignItems:"center", gap:5 }}>
                      <span style={{ background:"rgba(26,122,122,.15)", border:"1px solid rgba(26,122,122,.3)", padding:"2px 7px", borderRadius:3 }}>
                        ✓ Server {discordResult.serverId} verified
                      </span>
                      <span style={{ background:"rgba(26,122,122,.15)", border:"1px solid rgba(26,122,122,.3)", padding:"2px 7px", borderRadius:3 }}>
                        ✓ Role synced
                      </span>
                      <span style={{ background:"rgba(26,122,122,.15)", border:"1px solid rgba(26,122,122,.3)", padding:"2px 7px", borderRadius:3 }}>
                        ✓ Session secured
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize:11, color:"var(--dim)", marginBottom:14, lineHeight:1.6 }}>
                    ✓ Membership verified in server <strong style={{ color:"#7289da" }}>1227422529656983582</strong> · ✓ Role dynamically synced · ✓ Session revoked completely on logout
                  </div>
                </div>
              )}
            </div>

            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setDiscordModal(false)}>Cancel</button>
              {discordStep === 1 && (
                <button style={{ background:"#5865F2", color:"#fff", border:"none", padding:"8px 18px", borderRadius:"var(--radius)", fontWeight:600, cursor:"pointer" }}
                  onClick={handleDiscordAuth}>
                  Verify with Discord →
                </button>
              )}
              {discordStep === 3 && (
                <button style={{ background:"#5865F2", color:"#fff", border:"none", padding:"8px 18px", borderRadius:"var(--radius)", fontWeight:600, cursor:"pointer" }}
                  onClick={completeDiscordLogin}>
                  ✓ Enter Platform
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const INIT_APPLICATIONS = [
  { id:"APP-001", name:"Priya Nair",   email:"p.nair@email.com",  spec:"Public Defense",  submitted:"2025-06-01", status:"PENDING",  quals:"LLB, 1yr internship" },
  { id:"APP-002", name:"Connor Walsh", email:"c.walsh@email.com", spec:"Criminal Law",    submitted:"2025-07-10", status:"APPROVED", quals:"JD, 2yr firm experience" },
  { id:"APP-003", name:"Mei Lin",      email:"m.lin@email.com",   spec:"Corporate Law",   submitted:"2025-08-01", status:"REJECTED", quals:"LLB" },
];

const StaffRosterPage = ({ user, allUsers, setAllUsers, auditLog, setAuditLog, pointsLog }) => {
  const canAdmin  = canDo(user.role, 8);   // Chief+ can add/delete
  const canEdit   = canDo(user.role, 7);   // Deputy+ can edit ranks/pts
  const canView   = canDo(user.role, 4);   // Lawyers+ can view

  const [tab,        setTab]       = useState("roster");
  const [search,     setSearch]    = useState("");
  const [roleFilter, setRoleFilter]= useState("ALL");
  const [sortBy,     setSortBy]    = useState("points");
  const [sortDir,    setSortDir]   = useState("desc");
  const [selected,   setSelected]  = useState(null);

  const [showModal,  setShowModal] = useState(false);
  const [editMode,   setEditMode]  = useState(false);   // false=add, true=edit
  const [form, setForm] = useState({
    username:"", password:"", charName:"", citizenId:"",
    role:"LAWYER", section:"", points:0, phone:"", email:"",
    bio:"", discordId:"", active:true, badge:false,
  });
  const [formError, setFormError] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(null);

  const writeAudit = (action, detail, ref, severity="MEDIUM") => {
    const entry = {
      id:"AUD"+Date.now(),
      ts: new Date().toISOString(),
      actor: user.username,
      action,
      detail,
      ref,
      type:"admin",
      ip:"10.0.0."+Math.floor(Math.random()*254+1),
      severity,
    };
    if (setAuditLog) setAuditLog(p => [entry, ...p.slice(0,999)]);
  };

  const ROLE_GROUPS = ["ALL","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","JUDGE","BAR_HEAD","BAR_SUPERVISOR","BAR_MEMBER","HEAD_LAWYER","SENIOR_LAWYER","LAWYER","TRAINEE","CITIZEN"];

  const displayed = (allUsers || [])
    .filter(u => {
      if (roleFilter !== "ALL" && u.role !== roleFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (u.username||"").toLowerCase().includes(q)
          || (u.charName||"").toLowerCase().includes(q)
          || (u.citizenId||"").toLowerCase().includes(q)
          || (u.section||"").toLowerCase().includes(q)
          || (u.discordId||"").toLowerCase().includes(q);
    })
    .sort((a,b) => {
      let va, vb;
      if (sortBy==="points")  { va=a.points||0;   vb=b.points||0; }
      else if (sortBy==="username") { va=a.username||""; vb=b.username||""; }
      else if (sortBy==="role")     { va=ROLES[a.role]?.level||0; vb=ROLES[b.role]?.level||0; }
      else if (sortBy==="charName") { va=a.charName||""; vb=b.charName||""; }
      else { va=a.points||0; vb=b.points||0; }
      if (typeof va==="string") return sortDir==="asc"?va.localeCompare(vb):vb.localeCompare(va);
      return sortDir==="asc"?va-vb:vb-va;
    });

  const toggleSort = (col) => {
    if (sortBy===col) setSortDir(d=>d==="asc"?"desc":"asc");
    else { setSortBy(col); setSortDir("desc"); }
  };
  const SortIcon = ({col}) => sortBy===col ? (sortDir==="asc"?"↑":"↓") : <span style={{opacity:.3}}>↕</span>;

  const openAdd = () => {
    setForm({ username:"", password:"", charName:"", citizenId:"",
      role:"LAWYER", section:"", points:0, phone:"", email:"",
      bio:"", discordId:"", active:true, badge:false });
    setFormError("");
    setEditMode(false);
    setShowModal(true);
  };

  const openEdit = (u) => {
    setForm({ ...u });
    setFormError("");
    setEditMode(true);
    setShowModal(true);
  };

  const handleSave = () => {
    setFormError("");
    if (!form.username.trim()) { setFormError("Discord username is required."); return; }
    if (!form.charName.trim()) { setFormError("Character name is required."); return; }
    if (!editMode && !form.password.trim()) { setFormError("Password is required for new users."); return; }
    if (!editMode && (allUsers||[]).find(u=>u.username===form.username)) {
      setFormError("Username already exists."); return;
    }

    if (editMode) {
      const old = (allUsers||[]).find(u=>u.username===form.username);
      const changes = [];
      if (old) {
        if (old.role    !== form.role)    changes.push(`Role: ${old.role} → ${form.role}`);
        if (old.points  !== Number(form.points)) changes.push(`Points: ${old.points} → ${form.points}`);
        if (old.section !== form.section) changes.push(`Section: "${old.section}" → "${form.section}"`);
        if (old.charName!== form.charName)changes.push(`CharName: "${old.charName}" → "${form.charName}"`);
        if (old.active  !== form.active)  changes.push(`Active: ${old.active} → ${form.active}`);
        if (old.badge   !== form.badge)   changes.push(`Badge: ${old.badge} → ${form.badge}`);
      }
      setAllUsers(p => p.map(u => u.username===form.username
        ? { ...u, ...form, points:Number(form.points) }
        : u
      ));
      writeAudit(
        "User record updated",
        changes.length ? changes.join(" | ") : "No field changes detected",
        form.username,
        "HIGH"
      );
      toast(`${form.charName} updated`, "success");
    } else {
      const nu = {
        ...form,
        id: "USR-" + String(Date.now()).slice(-6),
        points: Number(form.points) || 0,
        joined: new Date().toISOString().slice(0,10),
      };
      setAllUsers(p => [...p, nu]);
      writeAudit(
        "User added to roster",
        `${form.username} (${ROLES[form.role]?.label||form.role}) — ${form.charName}`,
        form.username,
        "HIGH"
      );
      toast(`${form.charName} added to roster`, "success");
    }
    setShowModal(false);
  };

  const handleDelete = (u) => {
    setAllUsers(p => p.filter(x=>x.username!==u.username));
    writeAudit("User removed from roster", `${u.username} (${u.charName}) removed by ${user.username}`, u.username, "HIGH");
    toast(`${u.charName} removed`, "error");
    setConfirmDelete(null);
    if (selected?.username===u.username) setSelected(null);
  };

  const quickRank = (u, newRole) => {
    const oldRole = u.role;
    setAllUsers(p => p.map(x=>x.username===u.username?{...x,role:newRole}:x));
    writeAudit(
      "Rank changed",
      `${u.username} (${u.charName}): ${ROLES[oldRole]?.label} → ${ROLES[newRole]?.label}`,
      u.username,
      "HIGH"
    );
    toast(`${u.charName}: ${ROLES[newRole]?.label}`, "success");
    if (selected?.username===u.username) setSelected(s=>({...s,role:newRole}));
  };

  const [editingPts, setEditingPts] = useState(null);
  const [ptsVal, setPtsVal] = useState(0);
  const savePts = (u) => {
    const newPts = Math.max(0, Number(ptsVal));
    const diff = newPts - (u.points||0);
    setAllUsers(p=>p.map(x=>x.username===u.username?{...x,points:newPts}:x));
    writeAudit(
      "Points manually adjusted",
      `${u.username} (${u.charName}): ${u.points||0} → ${newPts} (${diff>=0?"+":""}${diff}) by ${user.username}`,
      u.username,
      diff < 0 ? "HIGH" : "MEDIUM"
    );
    toast(`Points updated: ${newPts}`, "success");
    setEditingPts(null);
  };

  const userHistory = (username) =>
    (pointsLog||[]).filter(e=>e.actor===username).slice(0,20);

  const totalActive   = (allUsers||[]).filter(u=>u.active).length;
  const totalSuspended= (allUsers||[]).filter(u=>!u.active).length;
  const totalPts      = (allUsers||[]).reduce((s,u)=>s+(u.points||0),0);
  const topUser       = [...(allUsers||[])].sort((a,b)=>(b.points||0)-(a.points||0))[0];

  if (!canView) return (
    <div className="fade" style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"50vh" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:10 }}>🔒</div>
        <div style={{ fontWeight:700, color:"var(--teal-l)" }}>Staff Roster — Access Restricted</div>
        <div style={{ color:"var(--dim)", marginTop:6 }}>Minimum Lawyer authority required to view staff roster.</div>
      </div>
    </div>
  );

  return (
    <div className="fade">
      {}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div>
          <div className="stitle">Staff Roster Management</div>
          <div className="ssub">Add, edit, and manage all Department of Justice personnel</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {canAdmin && (
            <button className="btn btn-teal btn-sm" onClick={openAdd}>
              <Ico n="plus" s={13}/> Add Staff Member
            </button>
          )}
        </div>
      </div>
      <div className="gl"/>

      {}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
        {[
          {label:"Total Staff",    v:totalActive,            color:"var(--teal-l)",  icon:"users"},
          {label:"Suspended",      v:totalSuspended,         color:"#e07a6e",        icon:"lock"},
          {label:"Total Pts Pool", v:totalPts.toLocaleString(),color:"var(--gold-l)",icon:"star"},
          {label:"Top Performer",  v:topUser?.charName||"—", color:"var(--blue)",    icon:"chart"},
        ].map(s=>(
          <div key={s.label} className="card" style={{borderLeft:`3px solid ${s.color}`}}>
            <div className="card-body" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px"}}>
              <div>
                <div style={{fontSize:typeof s.v==="string"?13:22,fontWeight:700,color:s.color,lineHeight:1.2}}>{s.v}</div>
                <div className="tsm tdim" style={{marginTop:3}}>{s.label}</div>
              </div>
              <Ico n={s.icon} s={20} c={s.color}/>
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="tabs" style={{marginBottom:14}}>
        {[["roster","📋 Full Roster"],["points","✦ Points View"],["audit","🔒 Audit Log"]].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?" active":""}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      {}
      {tab==="roster" && (
        <div>
          {}
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
            <input
              className="inp" style={{flex:"0 0 240px",maxWidth:240}}
              placeholder="Search name, Discord, citizen ID…"
              value={search} onChange={e=>setSearch(e.target.value)}
            />
            <select className="inp" style={{width:"auto",padding:"6px 10px"}} value={roleFilter} onChange={e=>setRoleFilter(e.target.value)}>
              {ROLE_GROUPS.map(r=>(
                <option key={r} value={r}>{r==="ALL"?"All Roles":ROLES[r]?.label||r} {r!=="ALL"?`(${(allUsers||[]).filter(u=>u.role===r).length})`:"" }</option>
              ))}
            </select>
            <span className="tsm tdim" style={{marginLeft:"auto"}}>{displayed.length} of {(allUsers||[]).length} shown</span>
          </div>

          {}
          {selected && (
            <div className="card" style={{marginBottom:14,border:"1px solid var(--teal-d)",boxShadow:"0 0 16px rgba(26,122,122,.1)"}}>
              <div style={{background:"linear-gradient(90deg,rgba(26,122,122,.12),transparent)",padding:"14px 18px",borderBottom:"1px solid var(--b1)",display:"flex",alignItems:"center",gap:14}}>
                <div className="av" style={{width:52,height:52,fontSize:18,flexShrink:0}}>{(selected.charName||selected.username||"?")[0].toUpperCase()}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16}}>{selected.charName||selected.username}</div>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginTop:4,flexWrap:"wrap"}}>
                    <span className="mo tsm" style={{color:"var(--teal-l)"}}>@{selected.username}</span>
                    <span className={`badge bg-${ROLES[selected.role]?.color||"gray"}`}>{ROLES[selected.role]?.label||selected.role}</span>
                    <span className={`badge bg-${selected.active?"green":"red"}`}>{selected.active?"ACTIVE":"SUSPENDED"}</span>
                    {selected.badge && <span className="badge bg-teal">✓ BADGE</span>}
                  </div>
                </div>
                <div style={{display:"flex",gap:7}}>
                  {canEdit && <button className="btn btn-teal btn-sm" onClick={()=>openEdit(selected)}><Ico n="edit" s={12}/> Edit</button>}
                  {canAdmin && <button className="btn btn-sm" style={{background:"rgba(224,122,110,.15)",color:"#e07a6e",border:"1px solid rgba(224,122,110,.3)"}} onClick={()=>setConfirmDelete(selected)}>Remove</button>}
                  <button className="btn btn-outline btn-xs" onClick={()=>setSelected(null)}><Ico n="x" s={13}/></button>
                </div>
              </div>
              <div className="card-body">
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
                  {[
                    ["Discord",      "@"+(selected.username||"—")],
                    ["Character Name",selected.charName||"—"],
                    ["Citizen ID",   selected.citizenId||"—"],
                    ["Section",      selected.section||"—"],
                    ["Email",        selected.email||"—"],
                    ["Phone",        selected.phone||"—"],
                    ["Discord ID",   selected.discordId||"—"],
                    ["Joined",       selected.joined||"—"],
                    ["Points",       (selected.points||0).toLocaleString()+" pts"],
                  ].map(([l,v])=>(
                    <div key={l} style={{background:"var(--surf)",border:"1px solid var(--b1)",borderRadius:"var(--radius)",padding:"10px 12px"}}>
                      <div className="lbl" style={{marginBottom:3}}>{l}</div>
                      <div style={{fontSize:13,fontWeight:500,fontFamily:l==="Citizen ID"||l==="Discord"?"'IBM Plex Mono',monospace":"inherit",color:l==="Points"?"var(--gold-l)":l==="Discord"?"var(--teal-l)":"inherit"}}>{v}</div>
                    </div>
                  ))}
                </div>
                {selected.bio && (
                  <div style={{background:"var(--surf)",border:"1px solid var(--b1)",borderRadius:"var(--radius)",padding:"10px 12px",marginBottom:10}}>
                    <div className="lbl" style={{marginBottom:3}}>Bio / Notes</div>
                    <div style={{fontSize:13,color:"var(--mid)"}}>{selected.bio}</div>
                  </div>
                )}
                {}
                {canEdit && (
                  <div style={{marginTop:10}}>
                    <div className="lbl" style={{marginBottom:6}}>Quick Rank Change</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {Object.entries(ROLES).filter(([k])=>!["ADMIN","CITIZEN"].includes(k)).map(([k,r])=>(
                        <button
                          key={k}
                          className={`btn btn-xs ${selected.role===k?"btn-teal":"btn-outline"}`}
                          onClick={()=>quickRank(selected,k)}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {}
                {userHistory(selected.username).length > 0 && (
                  <div style={{marginTop:12}}>
                    <div className="lbl" style={{marginBottom:6}}>Recent Points History</div>
                    <div style={{maxHeight:140,overflowY:"auto",border:"1px solid var(--b1)",borderRadius:"var(--radius)"}}>
                      {userHistory(selected.username).map(e=>{
                        const cfg = POINTS_CONFIG[e.action]||{};
                        return (
                          <div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 12px",borderBottom:"1px solid var(--b1)"}}>
                            <div style={{fontSize:11,color:"var(--mid)"}}>{cfg.label||e.action} — {e.detail}</div>
                            <span style={{fontWeight:700,fontSize:13,color:e.pts>0?"#4cd98a":"#e07a6e",fontFamily:"'IBM Plex Mono',monospace",flexShrink:0}}>{e.pts>0?"+":""}{e.pts}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {}
          <div className="card">
            <div style={{overflowX:"auto"}}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th style={{width:36}}></th>
                    <th style={{cursor:"pointer"}} onClick={()=>toggleSort("username")}>Discord <SortIcon col="username"/></th>
                    <th style={{cursor:"pointer"}} onClick={()=>toggleSort("charName")}>Character Name <SortIcon col="charName"/></th>
                    <th style={{cursor:"pointer"}} onClick={()=>toggleSort("role")}>Rank <SortIcon col="role"/></th>
                    <th>Section</th>
                    <th>Citizen ID</th>
                    <th style={{cursor:"pointer"}} onClick={()=>toggleSort("points")}>Points <SortIcon col="points"/></th>
                    <th>Badge</th>
                    <th>Status</th>
                    {canEdit && <th style={{textAlign:"center"}}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {displayed.length === 0 && (
                    <tr><td colSpan={canEdit?10:9} style={{textAlign:"center",color:"var(--dim)",padding:24}}>No staff match your filters.</td></tr>
                  )}
                  {displayed.map((u,i)=>{
                    const isSelected = selected?.username===u.username;
                    const tier = getRankFromPoints(u.points||0);
                    return (
                      <tr
                        key={u.id||u.username}
                        style={{background:isSelected?"rgba(26,122,122,.07)":"transparent",cursor:"pointer",transition:"background .1s"}}
                        onClick={()=>setSelected(isSelected?null:u)}
                      >
                        <td style={{textAlign:"center",color:"var(--dim)",fontFamily:"'IBM Plex Mono',monospace",fontSize:11}}>{i+1}</td>
                        <td>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div className="av" style={{width:28,height:28,fontSize:10,flexShrink:0}}>{(u.charName||u.username||"?")[0].toUpperCase()}</div>
                            <span className="mo tsm" style={{color:"var(--teal-l)"}}>@{u.username}</span>
                          </div>
                        </td>
                        <td style={{fontWeight:600}}>{u.charName||"—"}</td>
                        <td>
                          {canEdit ? (
                            <select
                              className="inp"
                              style={{padding:"3px 6px",fontSize:11,width:"auto",minWidth:130}}
                              value={u.role}
                              onClick={e=>e.stopPropagation()}
                              onChange={e=>quickRank(u,e.target.value)}
                            >
                              {Object.entries(ROLES).map(([k,r])=><option key={k} value={k}>{r.label}</option>)}
                            </select>
                          ) : (
                            <span className={`badge bg-${ROLES[u.role]?.color||"gray"}`}>{ROLES[u.role]?.label||u.role}</span>
                          )}
                        </td>
                        <td>
                          {canEdit ? (
                            <input
                              className="inp"
                              style={{padding:"3px 8px",fontSize:11,width:80}}
                              value={u.section||""}
                              onClick={e=>e.stopPropagation()}
                              onChange={e=>{
                                const val=e.target.value;
                                setAllUsers(p=>p.map(x=>x.username===u.username?{...x,section:val}:x));
                              }}
                              onBlur={e=>{
                                writeAudit("Section updated",`${u.username}: section → "${e.target.value}"`,u.username,"LOW");
                              }}
                            />
                          ) : <span className="tag">{u.section||"—"}</span>}
                        </td>
                        <td><span className="mo tsm tdim">{u.citizenId||"—"}</span></td>
                        <td onClick={e=>{if(canEdit){e.stopPropagation();setEditingPts(u.username);setPtsVal(u.points||0);}}}>
                          {editingPts===u.username ? (
                            <div style={{display:"flex",gap:4,alignItems:"center"}} onClick={e=>e.stopPropagation()}>
                              <input
                                className="inp"
                                type="number"
                                style={{padding:"3px 6px",fontSize:11,width:72}}
                                value={ptsVal}
                                onChange={e=>setPtsVal(e.target.value)}
                                onKeyDown={e=>{if(e.key==="Enter")savePts(u);if(e.key==="Escape")setEditingPts(null);}}
                                autoFocus
                              />
                              <button className="btn btn-teal btn-xs" onClick={()=>savePts(u)}>✓</button>
                              <button className="btn btn-outline btn-xs" onClick={()=>setEditingPts(null)}>✕</button>
                            </div>
                          ) : (
                            <div style={{display:"flex",alignItems:"center",gap:6}}>
                              <span style={{fontWeight:700,color:"var(--gold-l)",fontFamily:"'IBM Plex Mono',monospace"}}>{(u.points||0).toLocaleString()}</span>
                              <span style={{fontSize:9,color:tier.color==="gray"?"var(--dim)":`var(--${tier.color}-l)`,opacity:.8}}>{tier.icon}</span>
                              {canEdit && <span style={{fontSize:9,color:"var(--dim)",marginLeft:2}}>✎</span>}
                            </div>
                          )}
                        </td>
                        <td style={{textAlign:"center"}}>{u.badge?<span style={{color:"var(--teal-l)",fontSize:15}}>✓</span>:<span style={{color:"var(--dim)"}}>□</span>}</td>
                        <td>{u.active?<span className="badge bg-green">ACTIVE</span>:<span className="badge bg-red">SUSPENDED</span>}</td>
                        {canEdit && (
                          <td style={{textAlign:"center"}} onClick={e=>e.stopPropagation()}>
                            <div style={{display:"flex",gap:5,justifyContent:"center"}}>
                              <button className="btn btn-outline btn-xs" onClick={()=>openEdit(u)} title="Edit"><Ico n="edit" s={11}/></button>
                              {canAdmin && <button className="btn btn-xs" style={{background:"rgba(224,122,110,.12)",color:"#e07a6e",border:"1px solid rgba(224,122,110,.25)"}} onClick={()=>setConfirmDelete(u)} title="Remove">✕</button>}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {}
      {tab==="points" && (
        <div>
          <div className="card">
            <div className="card-header">
              <span style={{fontWeight:600}}>All Staff — Points Overview</span>
              <span className="badge bg-gold">{(allUsers||[]).filter(u=>u.active).length} Active Members</span>
            </div>
            <div style={{overflowX:"auto"}}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th style={{width:40}}>#</th>
                    <th>Discord</th>
                    <th>Character Name</th>
                    <th>Role / Rank</th>
                    <th>Section</th>
                    <th>Points</th>
                    <th>Rank Tier</th>
                    <th>Progress to Next</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...(allUsers||[])]
                    .filter(u=>u.active&&!["ADMIN","CITIZEN"].includes(u.role))
                    .sort((a,b)=>(b.points||0)-(a.points||0))
                    .map((u,i)=>{
                      const tier = getRankFromPoints(u.points||0);
                      const next = getNextRank(u.points||0);
                      const pct  = next ? Math.min(100,Math.round(((u.points||0)-tier.min)/(next.min-tier.min)*100)) : 100;
                      return (
                        <tr key={u.id||u.username}>
                          <td style={{textAlign:"center",fontFamily:"'IBM Plex Mono',monospace",color:"var(--dim)",fontSize:12}}>#{i+1}</td>
                          <td>
                            <div style={{display:"flex",alignItems:"center",gap:7}}>
                              <div className="av" style={{width:26,height:26,fontSize:10}}>{(u.charName||u.username||"?")[0].toUpperCase()}</div>
                              <span className="mo tsm" style={{color:"var(--teal-l)"}}>@{u.username}</span>
                            </div>
                          </td>
                          <td style={{fontWeight:600}}>{u.charName||"—"}</td>
                          <td><span className={`badge bg-${ROLES[u.role]?.color||"gray"}`}>{ROLES[u.role]?.label||u.role}</span></td>
                          <td><span className="tag">{u.section||"—"}</span></td>
                          <td>
                            <div style={{display:"flex",alignItems:"center",gap:6}}>
                              <span style={{fontSize:18,fontWeight:700,color:"var(--gold-l)",fontFamily:"'IBM Plex Mono',monospace"}}>{(u.points||0).toLocaleString()}</span>
                              {canEdit && (
                                <button className="btn btn-xs btn-outline" style={{padding:"1px 5px",fontSize:9}} onClick={()=>{setEditingPts(u.username);setPtsVal(u.points||0);setTab("roster");}}>✎</button>
                              )}
                            </div>
                          </td>
                          <td>
                            <div style={{display:"flex",alignItems:"center",gap:5}}>
                              <span style={{fontSize:14}}>{tier.icon}</span>
                              <span className={`badge bg-${tier.color}`}>{tier.label}</span>
                            </div>
                          </td>
                          <td style={{minWidth:160}}>
                            {next ? (
                              <div>
                                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--dim)",marginBottom:3}}>
                                  <span>→ {next.label}</span>
                                  <span>{(next.min-(u.points||0)).toLocaleString()} pts needed</span>
                                </div>
                                <div style={{height:7,background:"var(--surf)",borderRadius:4,overflow:"hidden",border:"1px solid var(--b1)"}}>
                                  <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,var(--teal),var(--teal-l))",borderRadius:4,transition:"width .4s"}}/>
                                </div>
                              </div>
                            ) : <span style={{color:"var(--gold-l)",fontSize:11}}>✦ Maximum rank</span>}
                          </td>
                          <td><span className={`badge bg-${u.active?"green":"red"}`}>{u.active?"ACTIVE":"SUSPENDED"}</span></td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

          {}
          <div className="g2" style={{gap:12,marginTop:14}}>
            <div className="card">
              <div className="card-header"><span style={{fontWeight:600,color:"#4cd98a"}}>✦ Award Values</span></div>
              <div className="card-body" style={{padding:"8px 14px"}}>
                {Object.entries(POINTS_CONFIG).filter(([,v])=>v.pts>0).map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid var(--b1)"}}>
                    <span style={{fontSize:12}}>{v.label}</span>
                    <span style={{fontWeight:700,color:"#4cd98a",fontFamily:"'IBM Plex Mono',monospace"}}>+{v.pts} pts</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-header"><span style={{fontWeight:600,color:"#e07a6e"}}>✦ Rank Thresholds</span></div>
              <div className="card-body" style={{padding:"8px 14px"}}>
                {Object.entries(RANK_THRESHOLDS).map(([k,r])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid var(--b1)"}}>
                    <div style={{display:"flex",gap:7,alignItems:"center"}}>
                      <span>{r.icon}</span>
                      <span className={`badge bg-${r.color}`}>{r.label}</span>
                    </div>
                    <span className="mo tsm" style={{color:"var(--gold-l)"}}>{r.min.toLocaleString()} — {r.max===9999?"∞":r.max.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {tab==="audit" && (
        <div className="card">
          <div className="card-header">
            <span style={{fontWeight:600}}>Roster Audit Log</span>
            <span className="badge bg-teal">{(auditLog||[]).filter(e=>e.type==="admin").length} admin events</span>
          </div>
          <div style={{overflowX:"auto"}}>
            <table className="tbl">
              <thead><tr><th>Timestamp</th><th>Admin</th><th>Action</th><th>Detail</th><th>Reference</th><th>IP</th><th>Severity</th></tr></thead>
              <tbody>
                {(auditLog||[]).filter(e=>e.type==="admin"||e.action?.toLowerCase().includes("user")||e.action?.toLowerCase().includes("rank")||e.action?.toLowerCase().includes("point")||e.action?.toLowerCase().includes("section")).slice(0,100).map(e=>(
                  <tr key={e.id}>
                    <td className="mo tsm tdim" style={{whiteSpace:"nowrap"}}>{new Date(e.ts).toLocaleString()}</td>
                    <td><span className="mo tsm" style={{color:"var(--teal-l)"}}>@{e.actor}</span></td>
                    <td style={{fontWeight:500,fontSize:12}}>{e.action}</td>
                    <td style={{maxWidth:240,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:12,color:"var(--mid)"}} title={e.detail}>{e.detail}</td>
                    <td><span className="mo tsm tdim">{e.ref}</span></td>
                    <td className="mo tsm tdim">{e.ip}</td>
                    <td><span className={`badge bg-${e.severity==="HIGH"?"red":e.severity==="MEDIUM"?"gold":"green"}`} style={{fontSize:"9px"}}>{e.severity}</span></td>
                  </tr>
                ))}
                {(auditLog||[]).length===0 && <tr><td colSpan={7} style={{textAlign:"center",color:"var(--dim)",padding:24}}>No audit events yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {}
      {showModal && (
        <div className="mo-ov">
          <div className="mo-box mo-lg" style={{maxWidth:860}}>
            <div className="mo-hd">
              <div>
                <div style={{fontWeight:700,fontSize:15}}>{editMode?"Edit Staff Record":"Add New Staff Member"}</div>
                <div className="tsm tdim">{editMode?`Editing: ${form.charName||form.username}`:"All changes are audit-logged with timestamp and your details."}</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setShowModal(false)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              {formError && <div className="alrt alrt-red" style={{marginBottom:12}}>{formError}</div>}

              {}
              <div style={{background:"rgba(26,122,122,.05)",border:"1px solid rgba(26,122,122,.15)",borderRadius:"var(--radius)",padding:"12px 14px",marginBottom:12}}>
                <div style={{fontSize:10,fontWeight:600,color:"var(--teal-l)",letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:10}}>Identity</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                  <div className="fg">
                    <label className="lbl">Discord Username *</label>
                    <input className="inp" value={form.username} disabled={editMode}
                      onChange={e=>setForm(p=>({...p,username:e.target.value}))}
                      placeholder="e.g. z.th"/>
                    {editMode && <div style={{fontSize:10,color:"var(--dim)",marginTop:3}}>Username cannot be changed</div>}
                  </div>
                  <div className="fg">
                    <label className="lbl">Character Name *</label>
                    <input className="inp" value={form.charName}
                      onChange={e=>setForm(p=>({...p,charName:e.target.value}))}
                      placeholder="In-game / full legal name"/>
                  </div>
                  <div className="fg">
                    <label className="lbl">Citizen ID</label>
                    <input className="inp" value={form.citizenId||""}
                      onChange={e=>setForm(p=>({...p,citizenId:e.target.value}))}
                      placeholder="e.g. JWJ82739"/>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
                  <div className="fg">
                    <label className="lbl">Discord ID (for OAuth)</label>
                    <input className="inp" value={form.discordId||""}
                      onChange={e=>setForm(p=>({...p,discordId:e.target.value}))}
                      placeholder="Discord server ID"/>
                  </div>
                  {!editMode && (
                    <div className="fg">
                      <label className="lbl">Password *</label>
                      <input className="inp" type="password" value={form.password}
                        onChange={e=>setForm(p=>({...p,password:e.target.value}))}
                        placeholder="Login password"/>
                    </div>
                  )}
                </div>
              </div>

              {}
              <div style={{background:"rgba(22,77,140,.05)",border:"1px solid rgba(22,77,140,.15)",borderRadius:"var(--radius)",padding:"12px 14px",marginBottom:12}}>
                <div style={{fontSize:10,fontWeight:600,color:"#5aabec",letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:10}}>Rank &amp; Department</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                  <div className="fg">
                    <label className="lbl">Rank / Role *</label>
                    <select className="inp" value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))}>
                      {Object.entries(ROLES).map(([k,r])=><option key={k} value={k}>{r.label} (Level {r.level})</option>)}
                    </select>
                  </div>
                  <div className="fg">
                    <label className="lbl">Section / Division</label>
                    <input className="inp" value={form.section||""}
                      onChange={e=>setForm(p=>({...p,section:e.target.value}))}
                      placeholder="e.g. A.S, U.C, BAR"/>
                  </div>
                  <div className="fg">
                    <label className="lbl">Points</label>
                    <input className="inp" type="number" min="0" value={form.points||0}
                      onChange={e=>setForm(p=>({...p,points:e.target.value}))}/>
                  </div>
                </div>
                <div style={{display:"flex",gap:20,marginTop:12}}>
                  <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}>
                    <input type="checkbox" checked={form.active} onChange={e=>setForm(p=>({...p,active:e.target.checked}))} style={{accentColor:"var(--teal)",width:14,height:14}}/>
                    Account Active
                  </label>
                  <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}>
                    <input type="checkbox" checked={form.badge||false} onChange={e=>setForm(p=>({...p,badge:e.target.checked}))} style={{accentColor:"var(--teal)",width:14,height:14}}/>
                    Badge Approved ✓
                  </label>
                </div>
              </div>

              {}
              <div style={{background:"rgba(196,154,0,.04)",border:"1px solid rgba(196,154,0,.15)",borderRadius:"var(--radius)",padding:"12px 14px",marginBottom:12}}>
                <div style={{fontSize:10,fontWeight:600,color:"var(--gold-l)",letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:10}}>Contact &amp; Profile</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div className="fg">
                    <label className="lbl">Email</label>
                    <input className="inp" value={form.email||""}
                      onChange={e=>setForm(p=>({...p,email:e.target.value}))}
                      placeholder="name@doj.gov"/>
                  </div>
                  <div className="fg">
                    <label className="lbl">Phone</label>
                    <input className="inp" value={form.phone||""}
                      onChange={e=>setForm(p=>({...p,phone:e.target.value}))}
                      placeholder="+1 555-0000"/>
                  </div>
                </div>
                <div className="fg" style={{marginBottom:0,marginTop:10}}>
                  <label className="lbl">Bio / Notes</label>
                  <textarea className="inp" value={form.bio||""}
                    onChange={e=>setForm(p=>({...p,bio:e.target.value}))}
                    placeholder="Role description, notes, specialization…"/>
                </div>
              </div>

              {}
              {form.role && (
                <div style={{background:"rgba(26,122,122,.06)",border:"1px solid rgba(26,122,122,.2)",borderRadius:"var(--radius)",padding:"10px 14px",display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{fontSize:20}}>{ROLES[form.role]?.icon||"⚖"}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:600}}>{form.charName||"New Staff"} will be assigned as <span className={`badge bg-${ROLES[form.role]?.color||"gray"}`}>{ROLES[form.role]?.label}</span> (Level {ROLES[form.role]?.level})</div>
                    <div style={{fontSize:11,color:"var(--dim)",marginTop:3}}>Starting with {Number(form.points)||0} points · Rank tier: {getRankFromPoints(Number(form.points)||0).label}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={handleSave}>
                <Ico n={editMode?"edit":"plus"} s={13}/> {editMode?"Save Changes":"Add to Roster"}
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {confirmDelete && (
        <div className="mo-ov">
          <div className="mo-box" style={{maxWidth:420}}>
            <div className="mo-hd">
              <span style={{fontWeight:700,color:"#e07a6e"}}>⚠ Remove Staff Member</span>
              <button className="btn btn-outline btn-xs" onClick={()=>setConfirmDelete(null)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-red">This action is permanent and will be recorded in the audit log with your credentials and timestamp.</div>
              <div style={{background:"var(--surf)",border:"1px solid var(--b1)",borderRadius:"var(--radius)",padding:"12px 14px",marginTop:8}}>
                <div style={{fontWeight:700,fontSize:14}}>{confirmDelete.charName}</div>
                <div className="mo tsm tdim">@{confirmDelete.username} · {ROLES[confirmDelete.role]?.label}</div>
                <div className="tsm tdim" style={{marginTop:4}}>{confirmDelete.points||0} pts · Joined {confirmDelete.joined}</div>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-sm" style={{background:"rgba(224,122,110,.2)",color:"#e07a6e",border:"1px solid rgba(224,122,110,.4)"}} onClick={()=>handleDelete(confirmDelete)}>Confirm Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CourtsPage = ({ user }) => {
  const [view, setView] = useState("roster");
  const canSchedule = hasPerm(user.role, "COURT_SCHEDULE");

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="stitle">Courts Section</div><div className="ssub">Judicial registry, court assignments, and session management</div></div>
        <div style={{ display:"flex", gap:8 }}>
          <span className="badge bg-blue">{INIT_JUDGES.filter(j=>j.status==="ACTIVE").length} Active</span>
          <span className="badge bg-gray">{INIT_JUDGES.filter(j=>j.status==="VACANT").length} Vacant</span>
        </div>
      </div>
      <div className="gl"/>

      {}
      <div className="g3" style={{ marginBottom:16, gap:10 }}>
        {[
          { label:"Total Judges", v:INIT_JUDGES.filter(j=>j.status==="ACTIVE").length, color:"var(--teal-l)", icon:"hammer" },
          { label:"Urgent Courts", v:INIT_JUDGES.filter(j=>j.court==="Urgent Court").length, color:"#e07a6e", icon:"shield" },
          { label:"Vacant Positions", v:INIT_JUDGES.filter(j=>j.status==="VACANT").length, color:"var(--gold-l)", icon:"users" },
          { label:"Hearings Pending", v:INIT_HEARINGS.filter(h=>h.status==="SCHEDULED").length, color:"var(--blue)", icon:"calendar" },
        ].map(s => (
          <div key={s.label} className="card" style={{ borderLeft:`3px solid ${s.color}` }}>
            <div className="card-body" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px" }}>
              <div><div style={{ fontSize:24, fontWeight:700, color:s.color }}>{s.v}</div><div className="tsm tdim">{s.label}</div></div>
              <Ico n={s.icon} s={22} c={s.color}/>
            </div>
          </div>
        ))}
      </div>

      <div className="tabs" style={{ marginBottom:14 }}>
        {[["roster","Judicial Roster"],["courts","Court Assignments"],["hearings","Upcoming Hearings"],["hierarchy","Rank Hierarchy"]].map(([k,l]) => (
          <div key={k} className={`tab${view===k?" active":""}`} onClick={()=>setView(k)}>{l}</div>
        ))}
      </div>

      {view === "roster" && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600 }}>Judicial Registry — All Judges</span></div>
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead><tr><th>Discord</th><th>Rank</th><th>Judge Name</th><th>Court</th><th>Section</th><th>Citizen ID</th><th>Points</th><th>Cases Presided</th><th>Appointed</th><th>Status</th></tr></thead>
              <tbody>
                {INIT_JUDGES.map(j => (
                  <tr key={j.id} style={{ opacity:j.status==="VACANT"? 0.5:1 }}>
                    <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{j.discord||"—"}</span></td>
                    <td><span className={`badge bg-${j.rank==="GENERAL_JUDGE"?"gold":j.rank==="SENIOR_LEAD_JUDGE"?"teal":"blue"}`}>{j.rank?.replace(/_/g," ")||"JUDGE"}</span></td>
                    <td style={{ fontWeight:600 }}>{j.name}</td>
                    <td>{j.court}</td>
                    <td><span className="tag">{j.section||"—"}</span></td>
                    <td><span className="mo tsm tdim">{j.citizenId||"—"}</span></td>
                    <td><span className="mo tsm" style={{ color:"var(--gold-l)" }}>{j.points?.toLocaleString()||"—"}</span></td>
                    <td>{j.presided}</td>
                    <td className="tsm tdim">{j.appointed||"Pending"}</td>
                    <td>{j.status==="ACTIVE"?<span className="badge bg-green">ACTIVE</span>:j.status==="VACANT"?<span className="badge bg-gray">VACANT</span>:<span className="badge bg-red">INACTIVE</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "courts" && (
        <div className="g2" style={{ gap:12 }}>
          {["Urgent Court","Supreme Court","District Court","Appeals Court"].map(court => {
            const judges = INIT_JUDGES.filter(j=>j.court===court);
            return (
              <div key={court} className="card">
                <div className="card-header">
                  <span style={{ fontWeight:700 }}>{court}</span>
                  <span className="badge bg-teal">{judges.filter(j=>j.status==="ACTIVE").length} Judges</span>
                </div>
                <div className="card-body">
                  {judges.length === 0 ? <div className="tsm tdim">No judges assigned.</div> : judges.map(j => (
                    <div key={j.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid var(--b1)" }}>
                      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                        <div className="av" style={{ width:32, height:32, fontSize:11 }}>{j.name.replace("Hon. ","").replace("[Vacant]","?").split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                        <div>
                          <div style={{ fontWeight:600, fontSize:13 }}>{j.name}</div>
                          <div className="tsm tdim">{j.spec} · {j.chamber}</div>
                        </div>
                      </div>
                      {j.status==="ACTIVE"?<span className="badge bg-green">ACTIVE</span>:<span className="badge bg-gray">VACANT</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "hearings" && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600 }}>Upcoming Hearings</span></div>
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead><tr><th>ID</th><th>Title</th><th>Type</th><th>Date</th><th>Time</th><th>Room</th><th>Judge</th><th>Case</th><th>Status</th></tr></thead>
              <tbody>
                {INIT_HEARINGS.sort((a,b)=>a.date.localeCompare(b.date)).map(h => (
                  <tr key={h.id}>
                    <td className="mo tsm tdim">{h.id}</td>
                    <td style={{ fontWeight:500 }}>{h.title}</td>
                    <td><span className="tag">{h.type}</span></td>
                    <td className="tsm">{h.date}</td>
                    <td className="tsm">{h.time}</td>
                    <td>{h.room}</td>
                    <td className="tsm">{INIT_JUDGES.find(j=>j.id===h.judge)?.name||h.judge}</td>
                    <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{h.caseId}</span></td>
                    <td>{h.status==="SCHEDULED"?<span className="badge bg-blue">SCHEDULED</span>:h.status==="COMPLETED"?<span className="badge bg-green">COMPLETED</span>:<span className="badge bg-red">{h.status}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "hierarchy" && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600 }}>Judicial Rank Hierarchy</span></div>
          <div className="card-body">
            {[
              { rank:"GENERAL_JUDGE",     label:"General Judge",      color:"gold",  icon:"★★★", desc:"Highest judicial authority — presides over all courts, constitutional matters." },
              { rank:"SENIOR_LEAD_JUDGE", label:"Senior Lead Judge",   color:"teal",  icon:"★★",  desc:"Senior appellate authority — reviews district court decisions." },
              { rank:"LEAD_JUDGE",        label:"Lead Judge",          color:"teal",  icon:"★",   desc:"Leads court sessions, manages dockets, assigns cases." },
              { rank:"JUDGE",             label:"Judge",               color:"blue",  icon:"⚖",   desc:"Presides over individual cases. Urgent Court, District Court." },
            ].map(r => {
              const members = INIT_JUDGES.filter(j => j.rank === r.rank && j.status === "ACTIVE");
              return (
                <div key={r.rank} style={{ display:"flex", gap:16, padding:"14px 0", borderBottom:"1px solid var(--b1)" }}>
                  <div style={{ width:48, height:48, borderRadius:"var(--radius)", background:`rgba(26,122,122,.12)`, border:`1px solid rgba(26,122,122,.2)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:18, color:`var(--${r.color}-l)` }}>{r.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14 }}>{r.label}</div>
                    <div className="tsm tdim" style={{ marginBottom:6 }}>{r.desc}</div>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      {members.length === 0
                        ? <span className="badge bg-gray">VACANT</span>
                        : members.map(m => <span key={m.id} className="badge bg-teal">{m.name}</span>)
                      }
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:11, color:"var(--dim)" }}>Level {ROLES[r.rank]?.level||"—"}</div>
                    <div className="mo tsm" style={{ color:"var(--teal-l)" }}>{members.length} / 1+</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const AuditReportPage = ({ user, auditLog }) => {
  const [tab, setTab] = useState("log");
  const [filter, setFilter] = useState("ALL");
  const [actorFilter, setActorFilter] = useState("");

  if (!hasPerm(user.role, "AUDIT_VIEW")) return (
    <div className="fade"><div className="alrt alrt-red"><strong>Access Denied.</strong> This section requires Deputy Chief clearance or above.</div></div>
  );

  const filtered = (auditLog||[]).filter(e => {
    if (filter !== "ALL" && e.severity !== filter) return false;
    if (actorFilter && !e.actor.toLowerCase().includes(actorFilter.toLowerCase())) return false;
    return true;
  });

  const gaps = [
    { id:"GAP-001", sev:"HIGH",   status:"OPEN",    title:"g.lok_ badge not approved", detail:"User g.lok_ (Alexander Carlos) has no active badge. License status PENDING. Cannot represent DOJ until approved by Bar Association.", action:"BAR_HEAD to review and approve or reject application.", page:"bar" },
    { id:"GAP-002", sev:"HIGH",   status:"OPEN",    title:"gilrx badge not approved",  detail:"Training Lawyer gilrx (Rod Saljoq) has no badge. Requires supervisor sign-off.", action:"Deputy Chief or Head Lawyer to approve training registration.", page:"bar" },
    { id:"GAP-003", sev:"HIGH",   status:"OPEN",    title:"3 judicial positions vacant", detail:"General Judge, Senior Lead Judge, and Lead Judge slots are all vacant. Court hierarchy is incomplete.", action:"Chief of DOJ to appoint qualified judges to fill vacancies.", page:"courts" },
    { id:"GAP-004", sev:"MEDIUM", status:"OPEN",    title:"LIC-X01 suspended — case reassignment needed", detail:"Edward Cho remains assigned to no active cases but retains a DOJ email. Full offboarding incomplete.", action:"Admin to deactivate email and archive records.", page:"admin" },
    { id:"GAP-005", sev:"LOW",    status:"RESOLVED", title:"Bar Association staff registered", detail:"sultan13579 (Head), y3_4 and albsof0556 (Supervisors) assigned. Placeholder accounts removed.", action:"Completed in audit cycle.", page:"roster" },
    { id:"GAP-006", sev:"LOW",    status:"RESOLVED", title:"Duplicate INIT_CASES declaration", detail:"Code had duplicate const INIT_CASES = [] declaration causing potential runtime errors.", action:"Fixed in this audit cycle.", page:"" },
    { id:"GAP-007", sev:"LOW",    status:"OPEN",    title:"Training lawyers not assigned supervisors", detail:"t10x, ez.95, gilrx have no assigned supervising senior lawyer.", action:"Head Lawyer to assign supervisors to each trainee.", page:"roster" },
    { id:"GAP-008", sev:"MEDIUM", status:"OPEN",    title:"2FA not enforced for command accounts", detail:"_n2a and abo3th (Chief & Deputy) have 2FA available but not confirmed as enabled.", action:"Admin to enforce 2FA policy for Tier 1 and Tier 2 roles.", page:"admin" },
    { id:"GAP-009", sev:"LOW",    status:"OPEN",    title:"Periodic access review overdue", detail:"Last access review recorded Jan 2026. Policy requires quarterly review (due Apr 2026).", action:"Admin to schedule Q2 2026 access review.", page:"admin" },
  ];

  const permMatrix = [
    { action:"View Cases",      roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","JUDGE","HEAD_LAWYER","SENIOR_LAWYER","LAWYER","TRAINEE"], perm:"CASE_VIEW" },
    { action:"Create Cases",    roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","HEAD_LAWYER","SENIOR_LAWYER","LAWYER"],                   perm:"CASE_CREATE" },
    { action:"Edit Cases",      roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","HEAD_LAWYER","SENIOR_LAWYER"],                           perm:"CASE_EDIT" },
    { action:"Close Cases",     roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],perm:"CASE_CLOSE" },
    { action:"Delete Cases",    roles:["ADMIN","DOJ_CHIEF"],                                                                        perm:"CASE_DELETE" },
    { action:"Upload Evidence", roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","HEAD_LAWYER","SENIOR_LAWYER","LAWYER"],                  perm:"EVIDENCE_UPLOAD" },
    { action:"Verify Evidence", roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE"],                    perm:"EVIDENCE_VERIFY" },
    { action:"Request Warrant", roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","HEAD_LAWYER","SENIOR_LAWYER","LAWYER"],                  perm:"WARRANT_REQUEST" },
    { action:"Issue Warrant",   roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE","LEAD_JUDGE","JUDGE"],perm:"WARRANT_ISSUE" },
    { action:"Manage Users",    roles:["ADMIN","DOJ_CHIEF"],                                                                        perm:"USER_MANAGE" },
    { action:"Assign Roles",    roles:["ADMIN"],                                                                                    perm:"ROLE_ASSIGN" },
    { action:"Bar Licensing",   roles:["ADMIN","DOJ_CHIEF","BAR_HEAD"],                                                             perm:"BAR_LICENSE" },
    { action:"Bar Discipline",  roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","BAR_HEAD","BAR_SUPERVISOR"],                             perm:"BAR_DISCIPLINE" },
    { action:"Admin Panel",     roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"],                                                         perm:"ADMIN_PANEL" },
    { action:"View Audit Log",  roles:["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"],                                                         perm:"AUDIT_VIEW" },
    { action:"System Config",   roles:["ADMIN"],                                                                                    perm:"SYSTEM_CONFIG" },
  ];

  const allRoles = ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","JUDGE","BAR_HEAD","BAR_SUPERVISOR","HEAD_LAWYER","SENIOR_LAWYER","LAWYER","TRAINEE","CITIZEN"];

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div className="stitle">Audit &amp; Security Report</div>
          <div className="ssub">Enterprise-level security audit, gap analysis, and permission review</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <span className="badge bg-red">{gaps.filter(g=>g.sev==="HIGH"&&g.status==="OPEN").length} Critical Gaps</span>
          <span className="badge bg-gold">{gaps.filter(g=>g.sev==="MEDIUM"&&g.status==="OPEN").length} Medium</span>
          <span className="badge bg-green">{gaps.filter(g=>g.status==="RESOLVED").length} Resolved</span>
        </div>
      </div>
      <div className="gl"/>

      {}
      <div style={{ background:"rgba(201,168,76,.08)", border:"1px solid rgba(201,168,76,.3)", borderRadius:"var(--radius)", padding:"14px 18px", marginBottom:16, display:"flex", gap:20, flexWrap:"wrap" }}>
        {[
          { label:"Audit Events", v:(auditLog||[]).length, color:"var(--teal-l)" },
          { label:"HIGH Severity", v:(auditLog||[]).filter(e=>e.severity==="HIGH").length, color:"#e07a6e" },
          { label:"Open Gaps", v:gaps.filter(g=>g.status==="OPEN").length, color:"var(--gold-l)" },
          { label:"Active Users", v:INIT_USERS.filter(u=>u.active).length, color:"#4cd98a" },
          { label:"Roles Defined", v:Object.keys(ROLES).length, color:"var(--blue)" },
          { label:"Perms Defined", v:Object.keys(PERMS).length, color:"var(--teal-l)" },
        ].map(s => (
          <div key={s.label} style={{ textAlign:"center" }}>
            <div style={{ fontSize:22, fontWeight:700, color:s.color }}>{s.v}</div>
            <div style={{ fontSize:10, color:"var(--dim)", letterSpacing:".5px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="tabs" style={{ marginBottom:14 }}>
        {[["log","Audit Log"],["gaps","Gap Analysis"],["perms","Permission Matrix"],["roles","Role Boundaries"]].map(([k,l]) => (
          <div key={k} className={`tab${tab===k?" active":""}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      {}
      {tab === "log" && (
        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight:600 }}>System Audit Log</span>
            <div style={{ display:"flex", gap:8 }}>
              <input className="inp" style={{ width:160, padding:"4px 8px", fontSize:11 }} placeholder="Filter by actor…" value={actorFilter} onChange={e=>setActorFilter(e.target.value)}/>
              {["ALL","CRITICAL","HIGH","MEDIUM","LOW"].map(s => (
                <button key={s} className={`btn btn-xs ${filter===s?"btn-teal":"btn-outline"}`} onClick={()=>setFilter(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead><tr><th>Timestamp</th><th>Actor</th><th>Action</th><th>Detail</th><th>Reference</th><th>IP</th><th>Severity</th></tr></thead>
              <tbody>
                {filtered.slice(0,100).map(e => (
                  <tr key={e.id}>
                    <td className="mo tsm tdim" style={{ whiteSpace:"nowrap" }}>{new Date(e.ts).toLocaleString()}</td>
                    <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{e.actor}</span></td>
                    <td style={{ fontWeight:500, fontSize:12 }}>{e.action}</td>
                    <td style={{ maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontSize:12, color:"var(--mid)" }}>{e.detail}</td>
                    <td><span className="mo tsm tdim">{e.ref}</span></td>
                    <td className="mo tsm tdim">{e.ip}</td>
                    <td>
                      <span className={`badge bg-${e.severity==="HIGH"?"red":e.severity==="MEDIUM"?"gold":"green"}`} style={{ fontSize:"9px" }}>{e.severity}</span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={7} style={{ textAlign:"center", color:"var(--dim)", padding:20 }}>No log entries match your filter.</td></tr>}
              </tbody>
            </table>
          </div>
          {filtered.length > 100 && <div style={{ padding:"8px 16px", fontSize:11, color:"var(--dim)", textAlign:"center" }}>Showing 100 of {filtered.length} events</div>}
        </div>
      )}

      {}
      {tab === "gaps" && (
        <div style={{ display:"grid", gap:10 }}>
          {gaps.map(g => (
            <div key={g.id} style={{ background:"var(--card)", border:`1px solid ${g.sev==="HIGH"?"rgba(224,122,110,.4)":g.sev==="MEDIUM"?"rgba(201,168,76,.3)":"var(--b1)"}`, borderLeft:`4px solid ${g.sev==="HIGH"?"#e07a6e":g.sev==="MEDIUM"?"var(--gold-d)":"#4cd98a"}`, borderRadius:"var(--radius)", padding:"14px 16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                    <span className={`badge bg-${g.sev==="HIGH"?"red":g.sev==="MEDIUM"?"gold":"green"}`}>{g.sev}</span>
                    <span className={`badge bg-${g.status==="OPEN"?"blue":"teal"}`}>{g.status}</span>
                    <span className="mo tsm tdim">{g.id}</span>
                  </div>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>{g.title}</div>
                  <div style={{ fontSize:12, color:"var(--mid)", marginBottom:8, lineHeight:1.6 }}>{g.detail}</div>
                  <div style={{ display:"flex", gap:6, alignItems:"flex-start" }}>
                    <span style={{ fontSize:10, color:"var(--gold-l)", fontWeight:600, textTransform:"uppercase", letterSpacing:".5px", whiteSpace:"nowrap" }}>Remediation:</span>
                    <span style={{ fontSize:12, color:"var(--mid)" }}>{g.action}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {}
      {tab === "perms" && (
        <div className="card" style={{ overflowX:"auto" }}>
          <div className="card-header"><span style={{ fontWeight:600 }}>Role × Permission Matrix</span><span className="tsm tdim">Green = Permitted · Red = Denied</span></div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:10 }}>
            <thead>
              <tr style={{ background:"var(--surf)", borderBottom:"2px solid var(--b2)" }}>
                <th style={{ padding:"8px 12px", textAlign:"left", minWidth:130 }}>Action</th>
                {allRoles.map(r => (
                  <th key={r} style={{ padding:"6px 4px", textAlign:"center", minWidth:70, color:`var(--${ROLES[r]?.color||"gray"}-l)`, fontWeight:600, fontSize:9 }}>
                    {ROLES[r]?.label?.replace(" ","\n")||r}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permMatrix.map((row, i) => (
                <tr key={row.action} style={{ background:i%2===0?"transparent":"rgba(255,255,255,.02)", borderBottom:"1px solid var(--b1)" }}>
                  <td style={{ padding:"6px 12px", fontWeight:500, fontSize:11 }}>{row.action}</td>
                  {allRoles.map(r => {
                    const ok = row.roles.includes(r);
                    return (
                      <td key={r} style={{ textAlign:"center", padding:"4px" }}>
                        {ok
                          ? <span style={{ color:"#4cd98a", fontSize:14 }}>✓</span>
                          : <span style={{ color:"rgba(255,255,255,.1)", fontSize:12 }}>·</span>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {}
      {tab === "roles" && (
        <div style={{ display:"grid", gap:10 }}>
          {Object.entries(ROLES).map(([key, role]) => {
            const users = INIT_USERS.filter(u => u.role === key && u.active);
            const perms = Object.entries(PERMS).filter(([, arr]) => arr.includes(key)).map(([k]) => k);
            return (
              <div key={key} className="card" style={{ borderLeft:`3px solid var(--${role.color||"gray"}-l, var(--mid))` }}>
                <div className="card-header">
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <span style={{ fontSize:18 }}>{role.icon}</span>
                    <div>
                      <div style={{ fontWeight:700 }}>{role.label}</div>
                      <div className="tsm tdim">Level {role.level} · {users.length} user{users.length!==1?"s":""} assigned</div>
                    </div>
                  </div>
                  <span className={`badge bg-${role.color||"gray"}`}>Tier {Math.ceil(role.level/2)}</span>
                </div>
                <div className="card-body">
                  <div className="g2" style={{ gap:12 }}>
                    <div>
                      <div className="lbl" style={{ marginBottom:6 }}>Assigned Personnel</div>
                      {users.length === 0
                        ? <span style={{ fontSize:12, color:"var(--dim)" }}>— No active users —</span>
                        : <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{users.map(u => <span key={u.id} className="badge bg-teal">{u.username}</span>)}</div>
                      }
                    </div>
                    <div>
                      <div className="lbl" style={{ marginBottom:6 }}>Granted Permissions ({perms.length})</div>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                        {perms.map(p => <span key={p} style={{ fontSize:9, background:"rgba(26,122,122,.12)", color:"var(--teal-l)", padding:"2px 6px", borderRadius:2, fontFamily:"'IBM Plex Mono',monospace", border:"1px solid rgba(26,122,122,.2)" }}>{p}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const LeaderboardPage = ({ user, allUsers, pointsLog }) => {
  const [period, setPeriod] = useState("all");
  const [category, setCategory] = useState("ALL");

  const ranked = [...allUsers]
    .filter(u => u.active && !["ADMIN","CITIZEN","BAR_HEAD","BAR_SUPERVISOR","BAR_MEMBER"].includes(u.role))
    .sort((a, b) => (b.points||0) - (a.points||0));

  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  const medalColors = ["#FFD700","#C0C0C0","#CD7F32"];
  const medalLabels = ["🥇","🥈","🥉"];

  const recentLog = (pointsLog || []).slice(0, 30);

  const userLog = (pointsLog || []).filter(e => e.actor === user.username);
  const myPts = allUsers.find(u => u.username === user.username)?.points || 0;
  const myRank = ranked.findIndex(u => u.username === user.username) + 1;
  const myNextRank = getNextRank(myPts);
  const myCurrentRank = getRankFromPoints(myPts);
  const ptsToNext = myNextRank ? myNextRank.min - myPts : 0;
  const progressPct = myNextRank
    ? Math.min(100, Math.round(((myPts - myCurrentRank.min) / (myNextRank.min - myCurrentRank.min)) * 100))
    : 100;

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div className="stitle">🏆 Points Leaderboard</div>
          <div className="ssub">Live ranking based on case work, evidence, warrants, and conduct</div>
        </div>
        <div className="badge bg-teal">{ranked.length} Active Staff</div>
      </div>
      <div className="gl"/>

      {}
      <div style={{ background:"linear-gradient(135deg,rgba(26,122,122,.15),rgba(22,77,140,.1))", border:"1px solid rgba(26,122,122,.3)", borderRadius:"var(--radius)", padding:"18px 22px", marginBottom:16, display:"flex", gap:20, alignItems:"center", flexWrap:"wrap" }}>
        <div className="av" style={{ width:52, height:52, fontSize:18, flexShrink:0 }}>{(user.username||"?")[0].toUpperCase()}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:16 }}>{user.charName || user.username}</div>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginTop:4 }}>
            <span className={`badge bg-${myCurrentRank.color}`}>{myCurrentRank.icon} {myCurrentRank.label}</span>
            <span style={{ fontSize:12, color:"var(--dim)" }}>Rank #{myRank || "—"} overall</span>
          </div>
          {myNextRank && (
            <div style={{ marginTop:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--dim)", marginBottom:4 }}>
                <span>Progress to {myNextRank.label}</span>
                <span>{myPts} / {myNextRank.min} pts · {ptsToNext} pts needed</span>
              </div>
              <div style={{ height:8, background:"var(--surf)", borderRadius:4, overflow:"hidden", border:"1px solid var(--b1)" }}>
                <div style={{ height:"100%", width:progressPct+"%", background:"linear-gradient(90deg,var(--teal),var(--teal-l))", borderRadius:4, transition:"width .5s" }}/>
              </div>
            </div>
          )}
          {!myNextRank && <div className="tsm" style={{ color:"var(--gold-l)", marginTop:8 }}>✦ Maximum rank achieved</div>}
        </div>
        <div style={{ textAlign:"center", flexShrink:0 }}>
          <div style={{ fontSize:36, fontWeight:700, color:"var(--gold-l)", lineHeight:1 }}>{myPts.toLocaleString()}</div>
          <div style={{ fontSize:11, color:"var(--dim)", marginTop:4 }}>Total Points</div>
        </div>
      </div>

      {}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
        {top3.map((u, i) => (
          <div key={u.id} style={{ background:"var(--card)", border:`2px solid ${medalColors[i]}44`, borderRadius:"var(--radius)", padding:"16px 14px", textAlign:"center", position:"relative", order:i===0?2:i===1?1:3 }}>
            <div style={{ fontSize:28, marginBottom:6 }}>{medalLabels[i]}</div>
            <div className="av" style={{ width:44, height:44, fontSize:16, margin:"0 auto 8px" }}>{(u.username||"?")[0].toUpperCase()}</div>
            <div style={{ fontWeight:700, fontSize:13 }}>{u.charName || u.username}</div>
            <div className="tsm tdim">{u.username}</div>
            <div style={{ fontSize:22, fontWeight:700, color:medalColors[i], marginTop:6 }}>{(u.points||0).toLocaleString()}</div>
            <div className="tsm tdim">pts</div>
            <span className={`badge bg-${ROLES[u.role]?.color||"gray"}`} style={{ marginTop:6, display:"inline-block" }}>{ROLES[u.role]?.label||u.role}</span>
            {u.username === user.username && <div style={{ position:"absolute", top:8, right:8, fontSize:10, background:"var(--teal-d)", color:"var(--teal-l)", padding:"2px 6px", borderRadius:2 }}>YOU</div>}
          </div>
        ))}
      </div>

      {}
      <div className="card" style={{ marginBottom:16 }}>
        <div className="card-header"><span style={{ fontWeight:600 }}>Full Rankings</span></div>
        <div style={{ overflowX:"auto" }}>
          <table className="tbl">
            <thead><tr><th style={{ width:48 }}>#</th><th>Staff Member</th><th>Role</th><th>Points</th><th>Rank Tier</th><th>Points Progress</th></tr></thead>
            <tbody>
              {ranked.map((u, i) => {
                const tier = getRankFromPoints(u.points||0);
                const nextTier = getNextRank(u.points||0);
                const pct = nextTier ? Math.min(100, Math.round(((u.points||0 - tier.min) / (nextTier.min - tier.min)) * 100)) : 100;
                const isMe = u.username === user.username;
                return (
                  <tr key={u.id} style={{ background: isMe ? "rgba(26,122,122,.06)" : "transparent", fontWeight: isMe ? 600 : 400 }}>
                    <td style={{ textAlign:"center", fontFamily:"'IBM Plex Mono',monospace", fontSize:13 }}>
                      {i < 3 ? medalLabels[i] : <span style={{ color:"var(--dim)" }}>#{i+1}</span>}
                    </td>
                    <td>
                      <div style={{ display:"flex", gap:9, alignItems:"center" }}>
                        <div className="av" style={{ width:30, height:30, fontSize:11 }}>{(u.username||"?")[0].toUpperCase()}</div>
                        <div>
                          <div style={{ fontSize:13 }}>{u.charName || u.username}</div>
                          <div className="mo tsm tdim">{u.username}{isMe?" (you)":""}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={`badge bg-${ROLES[u.role]?.color||"gray"}`}>{ROLES[u.role]?.label||u.role}</span></td>
                    <td><span style={{ fontSize:16, fontWeight:700, color:"var(--gold-l)" }}>{(u.points||0).toLocaleString()}</span></td>
                    <td>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <span style={{ fontSize:14 }}>{tier.icon}</span>
                        <span className={`badge bg-${tier.color}`}>{tier.label}</span>
                      </div>
                    </td>
                    <td style={{ minWidth:120 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ flex:1, height:6, background:"var(--surf)", borderRadius:3, overflow:"hidden", border:"1px solid var(--b1)" }}>
                          <div style={{ height:"100%", width:pct+"%", background:"linear-gradient(90deg,var(--teal),var(--teal-l))", borderRadius:3 }}/>
                        </div>
                        <span className="mo tsm tdim" style={{ whiteSpace:"nowrap" }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {}
      <div className="card">
        <div className="card-header"><span style={{ fontWeight:600 }}>Recent Points Activity</span><span className="badge bg-teal">{recentLog.length} events</span></div>
        <div style={{ overflowX:"auto" }}>
          <table className="tbl">
            <thead><tr><th>Time</th><th>Staff</th><th>Action</th><th>Detail</th><th>Points</th><th>Balance</th></tr></thead>
            <tbody>
              {recentLog.map(e => {
                const cfg = POINTS_CONFIG[e.action] || {};
                return (
                  <tr key={e.id}>
                    <td className="mo tsm tdim">{new Date(e.ts).toLocaleDateString()}</td>
                    <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{e.actor}</span></td>
                    <td><span className={`badge bg-${cfg.color||"gray"}`}>{cfg.label||e.action}</span></td>
                    <td style={{ fontSize:12, color:"var(--mid)", maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.detail}</td>
                    <td>
                      <span style={{ fontWeight:700, fontSize:14, color: e.pts > 0 ? "#4cd98a" : "#e07a6e" }}>
                        {e.pts > 0 ? "+" : ""}{e.pts}
                      </span>
                    </td>
                    <td><span className="mo tsm" style={{ color:"var(--gold-l)" }}>{(e.balance||0).toLocaleString()}</span></td>
                  </tr>
                );
              })}
              {recentLog.length === 0 && <tr><td colSpan={6} style={{ textAlign:"center", color:"var(--dim)", padding:20 }}>No activity yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PointsPage = ({ user, allUsers, setAllUsers, pointsLog, awardPoints }) => {
  const [tab, setTab] = useState("award");
  const [targetUser, setTargetUser] = useState("");
  const [actionKey, setActionKey] = useState("CASE_FILE");
  const [detail, setDetail] = useState("");
  const [ref, setRef] = useState("");
  const [disciplinary, setDisciplinary] = useState({ username:"", reason:"", severity:"MINOR", pts:-50, notes:"" });
  const [showDiscModal, setShowDiscModal] = useState(false);
  const [discHistory, setDiscHistory] = useState([
    { id:"DISC-001", ts:"2025-09-15T16:20:00Z", username:"atty.cho", reason:"Professional conduct violation — client fund misappropriation", severity:"MAJOR", pts:-200, issuedBy:"sultan13579", notes:"License suspended pending review." },
  ]);

  const canManage = canDo(user.role, 7); // Deputy Chief+
  const canFine = canDo(user.role, 8);   // Chief+

  const activeStaff = allUsers.filter(u =>
    u.active && !["ADMIN","CITIZEN"].includes(u.role)
  ).sort((a,b)=>(b.points||0)-(a.points||0));

  const handleAward = () => {
    if (!targetUser || !actionKey) { toast("Select a staff member and action","error"); return; }
    if (!detail.trim()) { toast("Reason is mandatory for all point modifications","error"); return; }
    awardPoints(targetUser, actionKey, detail, ref||"MANUAL", user.username);
    setDetail(""); setRef("");
  };

  const handleFine = () => {
    if (!targetUser || !actionKey) { toast("Select a staff member and action","error"); return; }
    if (!detail.trim()) { toast("Reason is mandatory for all fine/deduction actions","error"); return; }
    const key = ["FINE_MISCONDUCT","FINE_LATE","FINE_ABSENSE","FINE_CONTEMPT","DISCIPLINARY"].includes(actionKey) ? actionKey : "FINE_MISCONDUCT";
    awardPoints(targetUser, key, detail, ref||"MANUAL", user.username);
    setDetail(""); setRef("");
  };

  const issueDisc = () => {
    if (!disciplinary.username || !disciplinary.reason) { toast("Fill all required fields","error"); return; }
    const rec = { id:"DISC-"+Date.now(), ts:new Date().toISOString(), ...disciplinary, issuedBy:user.username };
    setDiscHistory(p => [rec, ...p]);
    awardPoints(disciplinary.username, "DISCIPLINARY", disciplinary.reason, rec.id);
    toast("Disciplinary record issued", "error");
    setShowDiscModal(false);
    setDisciplinary({ username:"", reason:"", severity:"MINOR", pts:-50, notes:"" });
  };

  const earningActions = Object.entries(POINTS_CONFIG).filter(([,v]) => v.pts > 0);
  const fineActions    = Object.entries(POINTS_CONFIG).filter(([,v]) => v.pts < 0);

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div className="stitle">Points &amp; Fines</div>
          <div className="ssub">Award points, issue fines, and manage disciplinary records</div>
        </div>
        {canFine && <button className="btn btn-sm" style={{ background:"rgba(224,122,110,.15)", color:"#e07a6e", border:"1px solid rgba(224,122,110,.3)" }} onClick={()=>setShowDiscModal(true)}>⚠ Issue Disciplinary Action</button>}
      </div>
      <div className="gl"/>

      {}
      <div className="g2" style={{ gap:12, marginBottom:16 }}>
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600, color:"#4cd98a" }}>✦ Point Awards</span></div>
          <div className="card-body" style={{ padding:"10px 14px" }}>
            {earningActions.map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid var(--b1)" }}>
                <span style={{ fontSize:12 }}>{v.label}</span>
                <span style={{ fontWeight:700, color:"#4cd98a", fontFamily:"'IBM Plex Mono',monospace" }}>+{v.pts} pts</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600, color:"#e07a6e" }}>✦ Penalties &amp; Fines</span></div>
          <div className="card-body" style={{ padding:"10px 14px" }}>
            {fineActions.map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid var(--b1)" }}>
                <span style={{ fontSize:12 }}>{v.label}</span>
                <span style={{ fontWeight:700, color:"#e07a6e", fontFamily:"'IBM Plex Mono',monospace" }}>{v.pts} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom:14 }}>
        {[["award","Award Points"],["fine","Issue Fine"],["staff","Staff Points"],["history","Points History"],["disciplinary","Disciplinary Log"]].map(([k,l]) => (
          <div key={k} className={`tab${tab===k?" active":""}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      {}
      {tab === "award" && canManage && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:700 }}>Award Points to Staff</span></div>
          <div className="card-body">
            <div className="alrt alrt-teal" style={{ marginBottom:14 }}>Only Deputy Chief and above can manually award points. Points are automatically awarded for case filings, evidence uploads, and warrants.</div>
            <div className="g2" style={{ gap:12 }}>
              <div className="fg">
                <label className="lbl">Staff Member *</label>
                <select className="inp" value={targetUser} onChange={e=>setTargetUser(e.target.value)}>
                  <option value="">— Select Staff —</option>
                  {activeStaff.map(u => <option key={u.id} value={u.username}>{u.charName||u.username} ({ROLES[u.role]?.label}) — {u.points||0} pts</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="lbl">Award For *</label>
                <select className="inp" value={actionKey} onChange={e=>setActionKey(e.target.value)}>
                  {earningActions.map(([k,v]) => <option key={k} value={k}>{v.label} (+{v.pts} pts)</option>)}
                </select>
              </div>
            </div>
            <div className="g2" style={{ gap:12 }}>
              <div className="fg"><label className="lbl">Description</label><input className="inp" value={detail} onChange={e=>setDetail(e.target.value)} placeholder="e.g. Successfully closed State v. Doe"/></div>
              <div className="fg"><label className="lbl">Reference (Case/Evidence ID)</label><input className="inp" value={ref} onChange={e=>setRef(e.target.value)} placeholder="e.g. CASE-2025-0041"/></div>
            </div>
            {targetUser && actionKey && (
              <div style={{ background:"rgba(26,122,122,.08)", border:"1px solid rgba(26,122,122,.2)", borderRadius:"var(--radius)", padding:"10px 14px", marginBottom:14 }}>
                <span style={{ fontSize:13 }}>Awarding <span style={{ fontWeight:700, color:"#4cd98a" }}>+{POINTS_CONFIG[actionKey]?.pts} points</span> to <span className="mo" style={{ color:"var(--teal-l)" }}>{targetUser}</span> for <strong>{POINTS_CONFIG[actionKey]?.label}</strong></span>
              </div>
            )}
            <button className="btn btn-teal" onClick={handleAward}>✦ Award Points</button>
          </div>
        </div>
      )}
      {tab === "award" && !canManage && (
        <div className="alrt alrt-red">You need Deputy Chief clearance to manually award points.</div>
      )}

      {}
      {tab === "fine" && canFine && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:700, color:"#e07a6e" }}>Issue Fine / Penalty</span></div>
          <div className="card-body">
            <div className="alrt alrt-gold" style={{ marginBottom:14 }}>⚠ Fines are permanent and recorded in the audit log. Ensure due process before issuing.</div>
            <div className="g2" style={{ gap:12 }}>
              <div className="fg">
                <label className="lbl">Staff Member *</label>
                <select className="inp" value={targetUser} onChange={e=>setTargetUser(e.target.value)}>
                  <option value="">— Select Staff —</option>
                  {activeStaff.map(u => <option key={u.id} value={u.username}>{u.charName||u.username} — {u.points||0} pts</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="lbl">Fine Type *</label>
                <select className="inp" value={actionKey} onChange={e=>setActionKey(e.target.value)}>
                  {fineActions.map(([k,v]) => <option key={k} value={k}>{v.label} ({v.pts} pts)</option>)}
                </select>
              </div>
            </div>
            <div className="g2" style={{ gap:12 }}>
              <div className="fg"><label className="lbl">Reason / Justification *</label><input className="inp" value={detail} onChange={e=>setDetail(e.target.value)} placeholder="State the reason for this fine…"/></div>
              <div className="fg"><label className="lbl">Reference</label><input className="inp" value={ref} onChange={e=>setRef(e.target.value)} placeholder="e.g. DISC-001 or hearing ID"/></div>
            </div>
            {targetUser && actionKey && (
              <div style={{ background:"rgba(224,122,110,.08)", border:"1px solid rgba(224,122,110,.2)", borderRadius:"var(--radius)", padding:"10px 14px", marginBottom:14 }}>
                <span style={{ fontSize:13 }}>Applying <span style={{ fontWeight:700, color:"#e07a6e" }}>{POINTS_CONFIG[actionKey]?.pts} points</span> to <span className="mo" style={{ color:"var(--teal-l)" }}>{targetUser}</span></span>
              </div>
            )}
            <button className="btn btn-sm" style={{ background:"rgba(224,122,110,.15)", color:"#e07a6e", border:"1px solid rgba(224,122,110,.3)" }} onClick={handleFine}>⚠ Issue Fine</button>
          </div>
        </div>
      )}
      {tab === "fine" && !canFine && (
        <div className="alrt alrt-red">You need Chief of DOJ clearance to issue fines.</div>
      )}

      {}
      {tab === "staff" && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600 }}>All Staff — Points Overview</span></div>
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead><tr><th>#</th><th>Staff Member</th><th>Role</th><th>Points</th><th>Rank Tier</th><th>Progress to Next</th><th>Trend</th></tr></thead>
              <tbody>
                {activeStaff.map((u, i) => {
                  const tier = getRankFromPoints(u.points||0);
                  const next = getNextRank(u.points||0);
                  const pct = next ? Math.min(100, Math.round(((u.points||0 - tier.min) / (next.min - tier.min)) * 100)) : 100;
                  const recentPts = (pointsLog||[]).filter(e=>e.actor===u.username).slice(0,3).reduce((s,e)=>s+e.pts,0);
                  return (
                    <tr key={u.id} style={{ background: u.username===user.username ? "rgba(26,122,122,.06)" : "transparent" }}>
                      <td style={{ fontFamily:"'IBM Plex Mono',monospace", textAlign:"center", color:"var(--dim)" }}>#{i+1}</td>
                      <td>
                        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                          <div className="av" style={{ width:28, height:28, fontSize:10 }}>{(u.username||"?")[0].toUpperCase()}</div>
                          <div>
                            <div style={{ fontSize:12, fontWeight:600 }}>{u.charName||u.username}</div>
                            <div className="mo tsm tdim">{u.username}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className={`badge bg-${ROLES[u.role]?.color||"gray"}`}>{ROLES[u.role]?.label}</span></td>
                      <td><span style={{ fontSize:16, fontWeight:700, color:"var(--gold-l)", fontFamily:"'IBM Plex Mono',monospace" }}>{(u.points||0).toLocaleString()}</span></td>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                          <span>{tier.icon}</span>
                          <span className={`badge bg-${tier.color}`}>{tier.label}</span>
                        </div>
                      </td>
                      <td style={{ minWidth:140 }}>
                        {next ? (
                          <div>
                            <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"var(--dim)", marginBottom:3 }}>
                              <span>→ {next.label}</span>
                              <span>{next.min - (u.points||0)} pts left</span>
                            </div>
                            <div style={{ height:6, background:"var(--surf)", borderRadius:3, overflow:"hidden", border:"1px solid var(--b1)" }}>
                              <div style={{ height:"100%", width:pct+"%", background:"linear-gradient(90deg,var(--teal),var(--teal-l))", borderRadius:3 }}/>
                            </div>
                          </div>
                        ) : <span style={{ color:"var(--gold-l)", fontSize:11 }}>✦ Max rank</span>}
                      </td>
                      <td>
                        <span style={{ fontSize:13, fontWeight:600, color: recentPts > 0 ? "#4cd98a" : recentPts < 0 ? "#e07a6e" : "var(--dim)" }}>
                          {recentPts > 0 ? "↑ +" : recentPts < 0 ? "↓ " : "— "}{recentPts !== 0 ? Math.abs(recentPts) : "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {}
      {tab === "history" && (
        <div className="card">
          <div className="card-header"><span style={{ fontWeight:600 }}>Full Points Transaction Log</span><span className="badge bg-teal">{(pointsLog||[]).length} records</span></div>
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead><tr><th>Date</th><th>Staff</th><th>Action</th><th>Points</th><th>Detail</th><th>Reference</th><th>Balance After</th></tr></thead>
              <tbody>
                {(pointsLog||[]).map(e => {
                  const cfg = POINTS_CONFIG[e.action] || {};
                  return (
                    <tr key={e.id}>
                      <td className="mo tsm tdim">{new Date(e.ts).toLocaleDateString()}</td>
                      <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{e.actor}</span></td>
                      <td><span className={`badge bg-${cfg.color||"gray"}`} style={{ fontSize:"9px" }}>{cfg.label||e.action}</span></td>
                      <td><span style={{ fontWeight:700, color:e.pts>0?"#4cd98a":"#e07a6e", fontFamily:"'IBM Plex Mono',monospace" }}>{e.pts>0?"+":""}{e.pts}</span></td>
                      <td style={{ fontSize:12, color:"var(--mid)", maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.detail}</td>
                      <td><span className="mo tsm tdim">{e.ref}</span></td>
                      <td><span className="mo tsm" style={{ color:"var(--gold-l)" }}>{(e.balance||0).toLocaleString()}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {}
      {tab === "disciplinary" && (
        <div style={{ display:"grid", gap:10 }}>
          {discHistory.length === 0 && <div className="alrt alrt-teal">No disciplinary records on file.</div>}
          {discHistory.map(d => (
            <div key={d.id} style={{ background:"var(--card)", border:"1px solid rgba(224,122,110,.3)", borderLeft:"4px solid #e07a6e", borderRadius:"var(--radius)", padding:"14px 16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                    <span className={`badge bg-${d.severity==="MAJOR"||d.severity==="CRITICAL"?"red":"gold"}`}>{d.severity}</span>
                    <span className="mo tsm tdim">{d.id}</span>
                    <span className="tsm tdim">{new Date(d.ts).toLocaleDateString()}</span>
                  </div>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>⚠ {d.username} — Disciplinary Record</div>
                  <div style={{ fontSize:13, color:"var(--mid)", marginBottom:6, lineHeight:1.6 }}>{d.reason}</div>
                  {d.notes && <div style={{ fontSize:12, color:"var(--dim)", fontStyle:"italic" }}>{d.notes}</div>}
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <span style={{ fontWeight:700, color:"#e07a6e", fontFamily:"'IBM Plex Mono',monospace", fontSize:16 }}>{d.pts} pts</span>
                  <div className="tsm tdim">Issued by: {d.issuedBy}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {}
      {showDiscModal && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd">
              <div><div style={{ fontWeight:700, color:"#e07a6e" }}>⚠ Issue Disciplinary Action</div><div className="tsm tdim">This creates a permanent record and deducts points.</div></div>
              <button className="btn btn-outline btn-xs" onClick={()=>setShowDiscModal(false)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-gold">Disciplinary actions are permanent, audit-logged, and visible to all command-level staff.</div>
              <div className="g2" style={{ gap:12 }}>
                <div className="fg">
                  <label className="lbl">Staff Member *</label>
                  <select className="inp" value={disciplinary.username} onChange={e=>setDisciplinary(p=>({...p,username:e.target.value}))}>
                    <option value="">— Select Staff —</option>
                    {allUsers.filter(u=>u.active).map(u=><option key={u.id} value={u.username}>{u.username} — {ROLES[u.role]?.label}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Severity *</label>
                  <select className="inp" value={disciplinary.severity} onChange={e=>setDisciplinary(p=>({...p,severity:e.target.value}))}>
                    <option value="MINOR">MINOR (-50 pts)</option>
                    <option value="MODERATE">MODERATE (-100 pts)</option>
                    <option value="MAJOR">MAJOR (-200 pts)</option>
                    <option value="CRITICAL">CRITICAL (-300 pts)</option>
                  </select>
                </div>
              </div>
              <div className="fg"><label className="lbl">Reason / Charges *</label><textarea className="inp" style={{ minHeight:80 }} value={disciplinary.reason} onChange={e=>setDisciplinary(p=>({...p,reason:e.target.value}))} placeholder="Describe the misconduct or violation in detail…"/></div>
              <div className="fg"><label className="lbl">Internal Notes</label><textarea className="inp" value={disciplinary.notes} onChange={e=>setDisciplinary(p=>({...p,notes:e.target.value}))} placeholder="Additional notes for the file…"/></div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowDiscModal(false)}>Cancel</button>
              <button className="btn btn-sm" style={{ background:"rgba(224,122,110,.2)", color:"#e07a6e", border:"1px solid rgba(224,122,110,.4)" }} onClick={issueDisc}>⚠ Confirm &amp; Issue</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BAUserManagementPage = ({ user, allUsers, setAllUsers, cases, setCases, audit }) => {
  const ALLOWED_ROLES = ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","BAR_HEAD","BAR_SUPERVISOR"];
  if (!user || !ALLOWED_ROLES.includes(user.role)) {
    return (
      <div className="fade" style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"50vh" }}>
        <div style={{ textAlign:"center", maxWidth:440 }}>
          <div style={{ fontSize:56, marginBottom:12 }}>🔒</div>
          <div style={{ fontWeight:700, fontSize:18, color:"var(--teal-l)", marginBottom:8 }}>BA User Management — Access Denied</div>
          <div style={{ color:"var(--dim)", marginBottom:12 }}>This section requires Bar Association Supervisor authority or higher. Your role (<strong style={{color:"var(--mid)"}}>{user?.role}</strong>) is not authorized.</div>
          <div className="alrt alrt-red" style={{ fontSize:11 }}>Unauthorized access attempts are logged. Incident ID: {user?.id}-{new Date().toISOString().slice(0,10)}</div>
        </div>
      </div>
    );
  }
  const [tab, setTab] = useState("users");
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [addUserForm, setAddUserForm] = useState({ username:"", charName:"", citizenId:"", role:"TRAINEE", email:"", password:"atty123", section:"", notes:"" });
  const [showAddUser, setShowAddUser] = useState(false);
  const [editCase, setEditCase] = useState(null);
  const [caseSearch, setCaseSearch] = useState("");

  const isBaHead = user.role === "BAR_HEAD";
  const isBaSup  = ["BAR_HEAD","BAR_SUPERVISOR"].includes(user.role);

  const PROTECTED_ROLES = ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF"];
  const ASSIGNABLE_ROLES = ["LAWYER","TRAINEE","SENIOR_LAWYER","BAR_MEMBER","CITIZEN"];

  const filteredUsers = allUsers.filter(u => {
    if (!isBaHead && PROTECTED_ROLES.includes(u.role)) return false;
    if (search && !u.username.toLowerCase().includes(search.toLowerCase()) &&
        !(u.charName||"").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filteredCases = (cases||[]).filter(c =>
    !caseSearch ||
    c.title?.toLowerCase().includes(caseSearch.toLowerCase()) ||
    c.id?.toLowerCase().includes(caseSearch.toLowerCase())
  );

  const saveUser = () => {
    if (!editUser) return;
    if (PROTECTED_ROLES.includes(editUser.role) && !isBaHead) {
      toast("Cannot modify protected role accounts","error"); return;
    }
    setAllUsers(prev => prev.map(u => u.id === editUser.id ? {
      ...editUser,
      lastEditedBy: user.username,
      lastEditedAt: new Date().toISOString(),
    } : u));
    if (audit) audit("User record edited",
      `${editUser.charName||editUser.username} (${editUser.username}) — edited by ${user.username}`,
      editUser.id, "MEDIUM");
    toast("User record updated", "success");
    setEditUser(null);
  };

  const addUser = () => {
    if (!addUserForm.username || !addUserForm.charName) { toast("Username and character name required","error"); return; }
    if (allUsers.find(u => u.username === addUserForm.username)) { toast("Username already exists","error"); return; }
    if (!ASSIGNABLE_ROLES.includes(addUserForm.role)) { toast("BA cannot assign that role","error"); return; }
    const nu = {
      id: "USR-BA" + Date.now(),
      username: addUserForm.username,
      password: addUserForm.password || "atty123",
      role: addUserForm.role,
      email: addUserForm.email || addUserForm.username + "@doj.gov",
      discordId: addUserForm.username,
      active: true,
      joined: new Date().toISOString().slice(0,10),
      phone: "", bio: addUserForm.notes || ROLES[addUserForm.role]?.label,
      citizenId: addUserForm.citizenId,
      charName: addUserForm.charName,
      points: 0, section: addUserForm.section, badge: false,
      addedBy: user.username,
      addedAt: new Date().toISOString(),
    };
    setAllUsers(prev => [...prev, nu]);
    if (audit) audit("User account created",
      `New user ${nu.charName} (${nu.username}) — ${ROLES[nu.role]?.label} — added by ${user.username}`,
      nu.id, "HIGH");
    toast(`${nu.charName} added as ${ROLES[nu.role]?.label}`, "success");
    setShowAddUser(false);
    setAddUserForm({ username:"", charName:"", citizenId:"", role:"TRAINEE", email:"", password:"atty123", section:"", notes:"" });
  };

  const deactivateUser = (u) => {
    if (PROTECTED_ROLES.includes(u.role)) { toast("Cannot deactivate protected accounts","error"); return; }
    setAllUsers(prev => prev.map(x => x.id === u.id ? {...x, active:false} : x));
    if (audit) audit("User deactivated", `${u.charName||u.username} (${u.username}) deactivated by ${user.username}`, u.id, "HIGH");
    toast(`${u.charName||u.username} deactivated`, "warn");
  };

  const saveCase = () => {
    if (!editCase || !setCases) return;
    setCases(prev => prev.map(c => c.id === editCase.id ? {
      ...editCase,
      lastEditedBy: user.username,
      lastEditedAt: new Date().toISOString(),
    } : c));
    if (audit) audit("Case record edited",
      `${editCase.title} (${editCase.id}) — modified by ${user.username}`,
      editCase.id, "MEDIUM");
    toast("Case updated", "success");
    setEditCase(null);
  };

  return (
    <div className="fade">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div className="stitle">BA User &amp; Case Management</div>
          <div className="ssub">Bar Association member management tools — all actions are audit logged</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {tab === "users" && <button className="btn btn-teal btn-sm" onClick={()=>setShowAddUser(true)}><Ico n="plus" s={13}/> Add User</button>}
        </div>
      </div>
      <div className="gl"/>

      <div className="alrt alrt-gold" style={{ marginBottom:14 }}>
        <strong>BA Management Scope:</strong> You can add/edit user details (name, username, points, section) and update case info.
        You <strong>cannot</strong> delete users, change ADMIN/Chief/Deputy accounts, or access system configuration.
        Every action is permanently logged with your user ID and timestamp.
      </div>

      <div className="tabs" style={{ marginBottom:14 }}>
        {[["users","User Management"],["cases","Case Management"]].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?" active":""}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      {}
      {tab === "users" && (
        <>
          <div style={{ marginBottom:12 }}>
            <input className="inp" style={{ maxWidth:280 }} value={search}
              onChange={e=>setSearch(e.target.value)} placeholder="Search by username or name…"/>
          </div>
          <div className="card">
            <div className="card-header">
              <span style={{ fontWeight:600 }}>All Users ({filteredUsers.length})</span>
              <span className="badge bg-gray">Protected accounts hidden based on your clearance</span>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Username</th><th>Character Name</th><th>Role</th>
                    <th>Citizen ID</th><th>Points</th><th>Section</th>
                    <th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id} style={{ opacity:u.active?1:.55 }}>
                      <td><span className="mo tsm" style={{ color:"var(--teal-l)" }}>{u.username}</span></td>
                      <td style={{ fontWeight:600 }}>{u.charName||"—"}</td>
                      <td><span className={`badge bg-${ROLES[u.role]?.color||"gray"}`}>{ROLES[u.role]?.label||u.role}</span></td>
                      <td><span className="mo tsm tdim">{u.citizenId||"—"}</span></td>
                      <td><span style={{ fontWeight:700, color:"var(--gold-l)", fontFamily:"'IBM Plex Mono',monospace" }}>{u.points||0}</span></td>
                      <td>{u.section||"—"}</td>
                      <td>{u.active?<span className="badge bg-green">ACTIVE</span>:<span className="badge bg-red">INACTIVE</span>}</td>
                      <td>
                        <div style={{ display:"flex", gap:5 }}>
                          {!PROTECTED_ROLES.includes(u.role) && (
                            <button className="btn btn-xs btn-outline" onClick={()=>setEditUser({...u})}>Edit</button>
                          )}
                          {PROTECTED_ROLES.includes(u.role) && (
                            <span className="tsm tdim" style={{ fontSize:10 }}>🔒 Protected</span>
                          )}
                          {isBaSup && !PROTECTED_ROLES.includes(u.role) && u.active && u.username !== user.username && (
                            <button className="btn btn-xs" style={{ background:"rgba(224,122,110,.12)",color:"#e07a6e",border:"1px solid rgba(224,122,110,.25)",fontSize:10 }}
                              onClick={()=>deactivateUser(u)}>Deactivate</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {}
      {tab === "cases" && (
        <>
          <div style={{ marginBottom:12 }}>
            <input className="inp" style={{ maxWidth:280 }} value={caseSearch}
              onChange={e=>setCaseSearch(e.target.value)} placeholder="Search cases…"/>
          </div>
          <div className="card">
            <div className="card-header">
              <span style={{ fontWeight:600 }}>Cases ({filteredCases.length})</span>
              <span className="badge bg-gold">BA can edit case info — cannot open/close cases</span>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table className="tbl">
                <thead><tr><th>Case ID</th><th>Title</th><th>Type</th><th>Status</th><th>Assigned Lawyer</th><th>Last Edited</th><th>Actions</th></tr></thead>
                <tbody>
                  {filteredCases.map(c=>(
                    <tr key={c.id}>
                      <td><span className="mo tsm tdim">{c.id}</span></td>
                      <td style={{ fontWeight:600, fontSize:13 }}>{c.title}</td>
                      <td><span className="tag">{c.type}</span></td>
                      <td>{statusBadge(c.status)}</td>
                      <td><span className="mo tsm tdim">{c.lawyer||"—"}</span></td>
                      <td><span className="tsm tdim">{c.lastEditedBy?`${c.lastEditedBy} · ${c.lastEditedAt?.slice(0,10)}`:"—"}</span></td>
                      <td>
                        <button className="btn btn-xs btn-outline" onClick={()=>setEditCase({...c})}>Edit Info</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {}
      {showAddUser && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>Add New User</div>
                <div className="tsm tdim">Audit entry will be created: actor=<strong>{user.username}</strong>, timestamp={new Date().toISOString().slice(0,19)}</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setShowAddUser(false)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="g2" style={{ gap:12 }}>
                <div className="fg">
                  <label className="lbl">Role *</label>
                  <select className="inp" value={addUserForm.role} onChange={e=>setAddUserForm(p=>({...p,role:e.target.value}))}>
                    {ASSIGNABLE_ROLES.map(r=><option key={r} value={r}>{ROLES[r]?.label||r}</option>)}
                  </select>
                  <div className="tsm tdim" style={{ marginTop:4 }}>BA can only assign Lawyer-tier and below</div>
                </div>
                <div className="fg">
                  <label className="lbl">Discord / Username *</label>
                  <input className="inp" value={addUserForm.username} onChange={e=>setAddUserForm(p=>({...p,username:e.target.value}))} placeholder="Discord username"/>
                </div>
                <div className="fg">
                  <label className="lbl">Character Name *</label>
                  <input className="inp" value={addUserForm.charName} onChange={e=>setAddUserForm(p=>({...p,charName:e.target.value}))} placeholder="Full in-game name"/>
                </div>
                <div className="fg">
                  <label className="lbl">Citizen ID</label>
                  <input className="inp" value={addUserForm.citizenId} onChange={e=>setAddUserForm(p=>({...p,citizenId:e.target.value}))} placeholder="e.g. ABC12345"/>
                </div>
                <div className="fg">
                  <label className="lbl">Email</label>
                  <input className="inp" value={addUserForm.email} onChange={e=>setAddUserForm(p=>({...p,email:e.target.value}))} placeholder="user@doj.gov"/>
                </div>
                <div className="fg">
                  <label className="lbl">Initial Password</label>
                  <input className="inp" value={addUserForm.password} onChange={e=>setAddUserForm(p=>({...p,password:e.target.value}))} placeholder="Default: atty123"/>
                </div>
                <div className="fg">
                  <label className="lbl">Section</label>
                  <input className="inp" value={addUserForm.section} onChange={e=>setAddUserForm(p=>({...p,section:e.target.value}))} placeholder="e.g. A.S Section"/>
                </div>
                <div className="fg">
                  <label className="lbl">Notes</label>
                  <input className="inp" value={addUserForm.notes} onChange={e=>setAddUserForm(p=>({...p,notes:e.target.value}))} placeholder="Role notes or reason for addition"/>
                </div>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setShowAddUser(false)}>Cancel</button>
              <button className="btn btn-teal" onClick={addUser}><Ico n="plus" s={13}/> Add User</button>
            </div>
          </div>
        </div>
      )}

      {}
      {editUser && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>Edit User — {editUser.username}</div>
                <div className="tsm tdim">Edit logged: actor=<strong>{user.username}</strong> · {new Date().toISOString().slice(0,19)}</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setEditUser(null)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="g2" style={{ gap:12 }}>
                <div className="fg">
                  <label className="lbl">Character Name</label>
                  <input className="inp" value={editUser.charName||""} onChange={e=>setEditUser(p=>({...p,charName:e.target.value}))}/>
                </div>
                <div className="fg">
                  <label className="lbl">Username (Discord)</label>
                  <input className="inp" value={editUser.username} onChange={e=>setEditUser(p=>({...p,username:e.target.value}))}/>
                </div>
                <div className="fg">
                  <label className="lbl">Citizen ID</label>
                  <input className="inp" value={editUser.citizenId||""} onChange={e=>setEditUser(p=>({...p,citizenId:e.target.value}))}/>
                </div>
                <div className="fg">
                  <label className="lbl">Points</label>
                  <input className="inp" type="number" value={editUser.points||0} onChange={e=>setEditUser(p=>({...p,points:parseInt(e.target.value)||0}))}/>
                </div>
                <div className="fg">
                  <label className="lbl">Section</label>
                  <input className="inp" value={editUser.section||""} onChange={e=>setEditUser(p=>({...p,section:e.target.value}))}/>
                </div>
                <div className="fg">
                  <label className="lbl">Email</label>
                  <input className="inp" value={editUser.email||""} onChange={e=>setEditUser(p=>({...p,email:e.target.value}))}/>
                </div>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Bio / Notes</label>
                  <textarea className="inp" value={editUser.bio||""} onChange={e=>setEditUser(p=>({...p,bio:e.target.value}))}/>
                </div>
                {isBaSup && !PROTECTED_ROLES.includes(editUser.role) && (
                  <div className="fg">
                    <label className="lbl">Role (BA scope only)</label>
                    <select className="inp" value={editUser.role} onChange={e=>setEditUser(p=>({...p,role:e.target.value}))}>
                      {ASSIGNABLE_ROLES.map(r=><option key={r} value={r}>{ROLES[r]?.label||r}</option>)}
                    </select>
                    <div className="tsm tdim" style={{ marginTop:4 }}>Role changes require Head of BA approval. Logged with HIGH severity.</div>
                  </div>
                )}
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setEditUser(null)}>Cancel</button>
              <button className="btn btn-teal" onClick={saveUser}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {}
      {editCase && (
        <div className="mo-ov">
          <div className="mo-box mo-lg">
            <div className="mo-hd">
              <div>
                <div style={{ fontWeight:700 }}>Edit Case Info — {editCase.id}</div>
                <div className="tsm tdim">Edit logged: actor=<strong>{user.username}</strong> · {new Date().toISOString().slice(0,19)}</div>
              </div>
              <button className="btn btn-outline btn-xs" onClick={()=>setEditCase(null)}><Ico n="x" s={13}/></button>
            </div>
            <div className="mo-bd">
              <div className="alrt alrt-gold" style={{ marginBottom:12 }}>
                BA can edit case descriptive info only. Case status, evidence, and warrants are controlled by legal staff.
              </div>
              <div className="g2" style={{ gap:12 }}>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Case Title</label>
                  <input className="inp" value={editCase.title||""} onChange={e=>setEditCase(p=>({...p,title:e.target.value}))}/>
                </div>
                <div className="fg">
                  <label className="lbl">Case Type</label>
                  <select className="inp" value={editCase.type||""} onChange={e=>setEditCase(p=>({...p,type:e.target.value}))}>
                    {["CRIMINAL","CIVIL","ADMINISTRATIVE","JUVENILE","TRAFFIC","FAMILY","OTHER"].map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="lbl">Assigned Lawyer (License ID)</label>
                  <input className="inp" value={editCase.lawyer||""} onChange={e=>setEditCase(p=>({...p,lawyer:e.target.value}))} placeholder="e.g. LIC-S01"/>
                </div>
                <div className="fg" style={{ gridColumn:"1/-1" }}>
                  <label className="lbl">Description / Notes</label>
                  <textarea className="inp" style={{ minHeight:70 }} value={editCase.description||""} onChange={e=>setEditCase(p=>({...p,description:e.target.value}))}/>
                </div>
              </div>
            </div>
            <div className="mo-ft">
              <button className="btn btn-outline" onClick={()=>setEditCase(null)}>Cancel</button>
              <button className="btn btn-teal" onClick={saveCase}>Save Case Info</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  componentDidCatch(error, info) { this.setState({ error }); }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding:32, fontFamily:"monospace", background:"#0a0e13", color:"#ff6b6b", minHeight:"100vh" }}>
          <div style={{ fontSize:18, fontWeight:700, marginBottom:16, color:"#ff6b6b" }}>⚠ Runtime Error — DOJ Portal</div>
          <div style={{ background:"#1a0a0a", padding:16, borderRadius:4, border:"1px solid #ff6b6b", fontSize:13, whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
            {this.state.error.toString()}
          </div>
          <div style={{ marginTop:12, fontSize:11, color:"#888" }}>Check browser console for full stack trace.</div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [user, setUser] = useState(null);
  const [showPublic, setShowPublic] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [allUsers, setAllUsers] = useState(INIT_USERS);
  const [pointsLog, setPointsLog] = useState([
    { id:"PL001", ts:"2025-01-20T11:30:00Z", actor:"z.th",        action:"EVIDENCE_UPLOAD", pts:30,  detail:"CCTV Footage — 14 Jan 2025",    ref:"EVD-001",        balance:687 },
    { id:"PL002", ts:"2025-01-14T09:10:00Z", actor:"z.th",        action:"CASE_FILE",       pts:50,  detail:"State v. Marcus L. Donovan",    ref:"CASE-2025-0041", balance:657 },
    { id:"PL003", ts:"2025-06-18T08:45:00Z", actor:"sultan13579",  action:"CASE_FILE",       pts:50,  detail:"Republic v. R. Castellan",      ref:"CASE-2025-0078", balance:621 },
    { id:"PL004", ts:"2025-07-10T09:30:00Z", actor:"o.s45",        action:"EVIDENCE_UPLOAD", pts:30,  detail:"Financial Records — Castellan", ref:"EVD-003",        balance:380 },
    { id:"PL005", ts:"2025-03-15T14:00:00Z", actor:"df_511",       action:"CASE_CLOSE",      pts:100, detail:"State v. L. Haines",            ref:"CASE-2024-0019", balance:354 },
    { id:"PL006", ts:"2025-09-15T16:20:00Z", actor:"atty.cho",     action:"DISCIPLINARY",    pts:-200,detail:"Professional conduct violation", ref:"DISC-001",       balance:0 },
  ]);
  const [cases, setCases] = useState(INIT_CASES);
  const [evidence, setEvidence] = useState(INIT_EVIDENCE);
  const [warrants, setWarrants] = useState(INIT_WARRANTS);
  const [notifs, setNotifs] = useState(INIT_NOTIFS);
  const [searchOpen, setSearchOpen] = useState(false);
  const [auditLog, setAuditLog] = useState(typeof INIT_AUDIT_LOG !== "undefined" ? INIT_AUDIT_LOG : []);

  const [feed, setFeed] = useState([
    { id:"F1", type:"case",     label:"Case opened",            detail:"State v. Marcus L. Donovan",  ref:"CASE-2025-0041", time:"Jan 14, 09:00 AM", user:"Prosecutor" },
    { id:"F2", type:"evidence", label:"Evidence uploaded",      detail:"CCTV Footage — 14 Jan 2025",  ref:"EVD-001",        time:"Jan 20, 11:30 AM", user:"atty.reeves" },
    { id:"F3", type:"warrant",  label:"Warrant issued",         detail:"Arrest — Marcus L. Donovan",  ref:"WRT-2025-001",   time:"Jan 16, 02:00 PM", user:"JDG-001" },
    { id:"F4", type:"evidence", label:"Evidence uploaded",      detail:"Witness Statement — J. Park", ref:"EVD-002",        time:"Jan 22, 10:15 AM", user:"atty.reeves" },
    { id:"F5", type:"case",     label:"Case opened",            detail:"Republic v. R. Castellan",    ref:"CASE-2025-0078", time:"Jun 18, 08:45 AM", user:"chief.harrison" },
    { id:"F6", type:"warrant",  label:"Search warrant issued",  detail:"Castellan Holdings",          ref:"WRT-2025-002",   time:"Jul 04, 03:00 PM", user:"JDG-003" },
    { id:"F7", type:"evidence", label:"Evidence uploaded",      detail:"Financial Records — Castellan",ref:"EVD-003",       time:"Jul 10, 09:30 AM", user:"chief.harrison" },
  ]);
    const addToFeed = useCallback((type, label, detail, ref, username) => {
    const entry = { id:"F"+Date.now(), type, label, detail, ref, user:username, time:new Date().toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}) };
    setFeed(p => [entry, ...p.slice(0,49)]);
    setNotifs(prev => [{ id:"N"+Date.now(), title:label, body:detail+" · "+ref, time:"Just now", read:false, type }, ...prev.slice(0,19)]);
    setAuditLog(p => [{ id:"AUD"+Date.now(), ts:new Date().toISOString(), actor:username, action:label, detail, ref, type, ip:"10.0.0."+Math.floor(Math.random()*254+1), severity: type==="warrant"?"HIGH":type==="case"?"MEDIUM":"LOW" }, ...p.slice(0,499)]);
  }, []);

  const audit = useCallback((action, detail, ref, severity="LOW") => {
    setAuditLog(p => [{ id:"AUD"+Date.now(), ts:new Date().toISOString(), actor:user?.username||"SYSTEM", action, detail, ref, type:"system", ip:"10.0.0."+Math.floor(Math.random()*254+1), severity }, ...p.slice(0,499)]);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const PRIV = ["ADMIN","DOJ_CHIEF","DEPUTY_CHIEF","GENERAL_JUDGE","SENIOR_LEAD_JUDGE"];
    const TIMEOUT = PRIV.includes(user.role) ? 1800000 : 3600000;
    let timer = setTimeout(() => {
      setUser(null);
      toast("Session expired — please re-authenticate", "error");
    }, TIMEOUT);
    const reset = () => { clearTimeout(timer); timer = setTimeout(() => setUser(null), TIMEOUT); };
    window.addEventListener("click", reset);
    window.addEventListener("keydown", reset);
    return () => { clearTimeout(timer); window.removeEventListener("click", reset); window.removeEventListener("keydown", reset); };
  }, [user?.username]);

  useEffect(() => {
    if (!user || user.authMethod !== "discord_server_verified") return;
    const memberKey = user.discordMemberKey || user.username;
    const check = verifyServerMembership(memberKey);
    if (!check.authorized) {
      const ts = new Date().toISOString();
      setAuditLog(prev => [{
        id: "AUD-RS-" + Date.now(), ts,
        actor: "SYSTEM (Discord Sync)",
        action: "ACCESS_REVOKED_MEMBERSHIP_LOST",
        ref: memberKey,
        detail: `Auto-revocation: ${memberKey} failed server membership check (${check.code}). Session terminated. Reason: ${check.reason}`,
        type: "auth", severity: "CRITICAL",
        ip: "10.0.0.1",
      }, ...prev.slice(0, 499)]);
      setUser(null);
      toast("Access revoked: " + check.reason, "error");
      return;
    }
    if (check.resolvedRole && check.resolvedRole !== user.role) {
      const ts = new Date().toISOString();
      setAuditLog(prev => [{
        id: "AUD-RS-" + Date.now(), ts,
        actor: "SYSTEM (Discord Sync)",
        action: "ROLE_ASSIGNED",
        ref: memberKey,
        detail: `Dynamic role sync: ${memberKey} role updated ${user.role} → ${check.resolvedRole} from server ${DOJ_DISCORD_SERVER_ID}. Discord roles: [${(check.discordRoles || []).join(", ")}].`,
        type: "auth", severity: "HIGH",
        ip: "10.0.0.1",
      }, ...prev.slice(0, 499)]);
      setUser(prev => ({ ...prev, role: check.resolvedRole, discordRoles: check.discordRoles || prev.discordRoles }));
      toast("Role updated from Discord: " + check.resolvedRole, "info");
    }
  }, [user?.discordMemberKey, user?.username]);

  useEffect(() => {
    if (!user || user.authMethod !== "discord_server_verified") return;
    const memberKey = user.discordMemberKey || user.username;
    const check = verifyServerMembership(memberKey);
    if (!check.authorized) {
      setUser(null);
      toast("Discord access revoked: " + check.reason, "error");
      return;
    }
    if (check.resolvedRole && check.resolvedRole !== user.role) {
      setUser(prev => ({ ...prev, role: check.resolvedRole, discordRoles: check.member?.roles || prev.discordRoles }));
      toast("Your role has been updated from Discord: " + check.resolvedRole, "info");
    }
  }, [user?.discordMemberKey, user?.username]);

  const awardPoints = useCallback((username, actionKey, detail, ref, executorId) => {
    const cfg = POINTS_CONFIG[actionKey];
    if (!cfg) return;
    const executor = executorId || user?.username || "SYSTEM";
    setAllUsers(prev => prev.map(u => {
      if (u.username !== username) return u;
      const newPts = Math.max(0, (u.points||0) + cfg.pts);
      return { ...u, points: newPts };
    }));
    setPointsLog(prev => {
      const balance = (allUsers.find(u2=>u2.username===username)?.points||0) + cfg.pts;
      return [{ id:"PL"+Date.now(), ts:new Date().toISOString(), actor:username, executorId:executor, action:actionKey, pts:cfg.pts, detail, ref, balance:Math.max(0,balance), reason:detail||cfg.label }, ...prev.slice(0,999)];
    });
    setAuditLog(al => [{
      id:"AUD-P-"+Date.now(), ts:new Date().toISOString(),
      actor:executor, actorId:executor,
      action: cfg.pts >= 0 ? "POINTS_AWARDED" : "POINTS_DEDUCTED",
      ref: username,
      detail:`${cfg.pts >= 0 ? "+" : ""}${cfg.pts} pts → ${username} | Action: ${cfg.label} | Reason: ${detail||"No reason"} | Ref: ${ref||"MANUAL"} | Executor: ${executor}`,
      type:"points", severity: cfg.pts < 0 ? "HIGH" : "MEDIUM",
      ip:"10.0."+Math.floor(Math.random()*3+1)+"."+Math.floor(Math.random()*200+10),
    }, ...al.slice(0,499)]);
    if (cfg.pts > 0) {
      toast(`+${cfg.pts} pts — ${cfg.label}`, "success");
    } else {
      toast(`${cfg.pts} pts — ${cfg.label}`, "error");
    }
    audit(cfg.label, detail+" ("+cfg.pts+"pts) by "+executor, ref, cfg.pts < 0 ? "HIGH" : "LOW");
  }, [allUsers, audit, user, setAuditLog]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const handler = () => setShowPublic(true);
    document.addEventListener("showPublic", handler);
    return () => document.removeEventListener("showPublic", handler);
  }, []);

  useEffect(() => {
    const handleKey = e => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); } };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (showPublic) return (
    <>
      <AppStyles />
      <ToastHost />
      <PdfModal />
      <PublicLookup onLogin={() => setShowPublic(false)} />
    </>
  );

  if (!user) return (
    <>
      <AppStyles />
      <ToastHost />
      <PdfModal />
      <AuthScreen onLogin={setUser} />
    </>
  );

  const renderPage = () => {
    switch (page) {
      case "dashboard":    if (!isDOJRole(user?.role)) return <AccessDeniedPage user={user} page="Dashboard" setAuditLog={setAuditLog}/>; return <Dashboard user={user} cases={cases} evidence={evidence} warrants={warrants} feed={feed} setPage={setPage}/>;
      case "cases":        if (!hasPerm(user?.role,"CASE_VIEW"))        return <AccessDeniedPage user={user} page="Cases" setAuditLog={setAuditLog}/>; return <CasesPage user={user} cases={cases} setCases={setCases} evidence={evidence} setEvidence={setEvidence} warrants={warrants} setWarrants={setWarrants} setAuditLog={setAuditLog} onAdd={(c)=>{addToFeed("case","Case created",c.title,c.id,user.username);awardPoints(user.username,"CASE_FILE",c.title,c.id);}} onAddEvidence={(e)=>{addToFeed("evidence","Evidence uploaded",e.title,e.id,user.username);awardPoints(user.username,"EVIDENCE_UPLOAD",e.title,e.id);}} onAddWarrant={(w)=>{addToFeed("warrant","Warrant issued",w.type+" — "+w.subject,w.id,user.username);awardPoints(user.username,"WARRANT_ISSUE",w.subject,w.id);}}/>;
      case "documents":    if (!hasPerm(user?.role,"DOC_VIEW"))         return <AccessDeniedPage user={user} page="Documents" setAuditLog={setAuditLog}/>; return <DocumentsPage user={user} allUsers={allUsers} cases={cases} auditLog={auditLog} setAuditLog={setAuditLog} audit={audit}/>;
      case "evidence":     if (!hasPerm(user?.role,"EVIDENCE_VIEW"))   return <AccessDeniedPage user={user} page="Evidence" setAuditLog={setAuditLog}/>; return <EvidencePage user={user} evidence={evidence} setEvidence={setEvidence} setAuditLog={setAuditLog} onAdd={(e)=>{addToFeed("evidence","Evidence uploaded",e.title,e.id,user.username);awardPoints(user.username,"EVIDENCE_UPLOAD",e.title,e.id);}}/>;
      case "calendar":     return <CalendarPage user={user}/>;
      case "jury":         return <JuryPage/>;
      case "judgesection": return <JudgeSectionPage user={user} allUsers={allUsers} cases={cases} setCases={setCases} auditLog={auditLog} setAuditLog={setAuditLog}/>;
      case "precedents":   return <PrecedentsPage/>;
      case "criminal":     if (!hasPerm(user?.role,"CRIMINAL_VIEW"))   return <AccessDeniedPage user={user} page="Criminal Records" setAuditLog={setAuditLog}/>; return <CriminalRecordsPage user={user}/>;
      case "citizens":     if (!hasPerm(user?.role,"CITIZEN_VIEW"))    return <AccessDeniedPage user={user} page="Citizen Profiles" setAuditLog={setAuditLog}/>; return <CitizensPage user={user}/>;
      case "casefolders":  if (!hasPerm(user?.role,"CASE_FOLDER_VIEW")) return <AccessDeniedPage user={user} page="Case Folders" setAuditLog={setAuditLog}/>; return <CaseFoldersPage user={user} cases={cases}/>;
      case "legaldocs":    if (!hasPerm(user?.role,"LEGAL_DOC_VIEW"))   return <AccessDeniedPage user={user} page="Legal Documents" setAuditLog={setAuditLog}/>; return <LegalDocsPage user={user}/>;
      case "pleadeals":    if (!hasPerm(user?.role,"PLEA_VIEW"))        return <AccessDeniedPage user={user} page="Plea Deals" setAuditLog={setAuditLog}/>; return <PleaDealsPage user={user}/>;
      case "warrants":     return <WarrantsPage user={user} type="ALL" warrants={warrants} setWarrants={setWarrants} onAdd={(w)=>{addToFeed("warrant","Warrant issued",w.type+" — "+w.subject,w.id,user.username);awardPoints(user.username,"WARRANT_ISSUE",w.subject,w.id);}}/>;
      case "bench":        return <WarrantsPage user={user} type="BENCH" warrants={warrants} setWarrants={setWarrants} onAdd={(w)=>addToFeed("warrant","Bench warrant issued",w.subject,w.id,user.username)}/>;
      case "inmates":      return <InmatesPage user={user}/>;
      case "analytics":    return <AnalyticsPage cases={cases} evidence={evidence} warrants={warrants}/>;
      case "chat":         return <ChatPage user={user}/>;
      case "bar":          return <BarPage user={user} auditLog={auditLog} audit={audit} setAuditLog={setAuditLog} allUsers={allUsers} setAllUsers={setAllUsers}/>;
      case "admin":        return <AdminPage user={user} allUsers={allUsers} setAllUsers={setAllUsers} auditLog={auditLog} audit={audit}/>;
      case "profile":      return <ProfilePage user={user} allUsers={allUsers} setAllUsers={setAllUsers}/>;
      case "roster":       return <StaffRosterPage user={user} allUsers={allUsers} setAllUsers={setAllUsers} auditLog={auditLog} setAuditLog={setAuditLog} pointsLog={pointsLog}/>;
      case "courts":       return <CourtsPage user={user}/>;
      case "bausermgmt":   return <BAUserManagementPage user={user} allUsers={allUsers} setAllUsers={setAllUsers} cases={cases} setCases={setCases} audit={audit}/>;
      case "leaderboard":  return <LeaderboardPage user={user} allUsers={allUsers} pointsLog={pointsLog}/>;
      case "points":       return <PointsPage user={user} allUsers={allUsers} setAllUsers={setAllUsers} pointsLog={pointsLog} awardPoints={awardPoints}/>;
      case "auditreport":  return <AuditReportPage user={user} auditLog={auditLog}/>;
      case "public":       return <PublicLookup onLogin={() => setPage("dashboard")}/>;
      default:             return <Dashboard user={user} cases={cases} evidence={evidence} warrants={warrants} feed={feed} setPage={setPage}/>;
    }
  };

  return (
    <ErrorBoundary>
    <>
      <AppStyles />
      <ToastHost />
      <PdfModal />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} setPage={p => { setPage(p); setSearchOpen(false); }}/>
      <div className="app-layout">
        <Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} user={user} onLogout={()=>{
          const logoutTs = new Date().toISOString();
          if (user?.authMethod === "discord_server_verified") {
            setAuditLog(prev => [{
              id: "AUD-LO-" + Date.now(),
              ts: logoutTs,
              actor: user.discordMemberKey || user.username,
              action: "DISCORD_LOGOUT",
              ref: user.sessionId || user.id,
              detail: `Discord session revoked. User: ${user.discordMemberKey || user.username}. Server: ${DOJ_DISCORD_SERVER_ID}. Session terminated. All platform privileges removed.`,
              type: "auth", severity: "HIGH",
              ip: "10.0.1." + Math.floor(Math.random() * 200 + 10),
            }, ...prev.slice(0, 499)]);
          } else if (user) {
            setAuditLog(prev => [{
              id: "AUD-LO-" + Date.now(),
              ts: logoutTs,
              actor: user.username,
              action: "SESSION_LOGOUT",
              ref: user.id,
              detail: `Session terminated: ${user.username} (${user.role}). All access revoked.`,
              type: "auth", severity: "MEDIUM",
              ip: "10.0.1." + Math.floor(Math.random() * 200 + 10),
            }, ...prev.slice(0, 499)]);
          }
          setUser(null);
          toast("Session terminated — all access revoked. Re-authentication required.", "warn");
        }}/>
        <div className="main-area">
          <TopBar user={user} dark={dark} setDark={setDark} notifs={notifs} setNotifs={setNotifs} onSearch={() => setSearchOpen(true)}/>
          <div className="page-content">
            {renderPage()}
          </div>
        </div>
      </div>
    </>
    </ErrorBoundary>
  );
}

