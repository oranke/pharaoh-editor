# 구글 스프레드 쉬트의 파라오 레벨 정보 중복체크

생성기로 만들어낸 랜덤 레벨들에 해시태그를 먹이고 중복체크. 

처음에는 스프레드쉬트에 접속해 정보를 받아 처리했으나, 공유 정보를 바꾼 이후 동작하지 않아서... 
그냥 파일을 읽어 처리하도록 수정. 


## 블럭 배치 문자열에서 해시 추출

쉬트 A 컬럼에는 갯수, B 컬럼은 배치문자열, C 컬럼은 해시값을 기준으로 한다. 

B 컬럼을 복사해 input.txt 로 사용. 

**input.txt**
```
12-0-2,0-0-3,3-1-3,27-0-3,24-1-2,10-1-2
12-0-2,1-0-2,3-1-3,19-0-3,8-1-2,18-1-2
12-0-2,10-1-2,15-1-2,27-0-3,22-0-2,5-1-3
12-0-2,10-1-2,17-1-2,3-1-3,27-0-2,20-0-3
12-0-2,10-1-2,21-0-3,5-1-3,3-1-3,27-0-3
12-0-2,10-1-2,21-1-2,14-1-2,22-0-2,5-1-3
12-0-2,10-1-2,27-0-2,3-1-3,33-0-2,8-1-2
......
```

```bash
$ node ./index.js > result.txt
```


## 블럭 배치 문자열에서 게임 정보 추출

A 컬럼과 B 컬럼을 모두 복사해 input.txt 로 사용. 각 셀은 탭으로 구분됨. 

**input.txt**

```
06 steps	12-0-2,0-0-3,3-1-3,27-0-3,24-1-2,10-1-2
06 steps	12-0-2,1-0-2,3-1-3,19-0-3,8-1-2,18-1-2
06 steps	12-0-2,1-0-2,5-1-3,6-0-3,14-1-2,27-0-3
06 steps	12-0-2,10-1-2,11-1-2,2-1-3,9-1-2,31-0-2
06 steps	12-0-2,10-1-2,14-1-3,22-0-2,5-1-3,3-0-2
06 steps	12-0-2,10-1-2,15-1-2,27-0-3,22-0-2,5-1-3
......
```

명령은 동일. 

```bash
$ node ./index.js > result.txt
```

