# my-ffmpeg

Editor de séries e filmes

# npm run movies
  comando que arruma os filmes, na pasta de "files/movies", colocar cada filme separado por pasta, tem que ter um arquivo de video
  pode ter qualquer nome, e pode ter: imagem pra capa(qualquer nome), e legendas(quantas quiser), o nome da legenda vai ser o nome do arquivo de legenda, sê tiver legenda em portugês, o nome do arquivo tem que ser "por". 
  
  TODOS OS ARQUIVOS DE CADA FILME DEV TAR NA PASTA REFÊRENTE AO FILME, O NOME DA PASTA VAI SER O QUE O ARQUIVO VAI FICAR. 

  Ex: Nome do filme => filme.mp4
       (^pasta^)       eng.srt
                       por.sub
                       cover.jpg



# npm run tv-show
  comando que arruma série, na pasta de "files/tv-show", cada pasta é referente a uma temporada de uma série,
  os episodios da temporada vão ficar na raiz da pasta, sê quiser colocar alegendas é só colocar em uma pasta com o nome referente 
  ao idioma, ex: legendas em português tem que ficar na pasta "por", em ingles, tem que ficar na "eng", pode ter quantas legendas quiser
  o numero de item tem que ser igual em todos, se tiver 20 episodios em uma tenporada e tiver legenda, tem que ter 20 legendas também,
  tudo é organizado pelo ordem, ele pega o primeiro episodio, e a primeira legenda de cada pasta, e salva com o primeiro nome.

  nomes de cada episódio vai ficar em uma nota com o nome "names.txt" cada linha vai ser referente a cada episódio, não é pra colocar o número de cada episódio

  Ex: 1° Temporada => ep1.mp4
        (^pasta^)     ep2.mp4
                      ep3.mp4
                      eng => 1.srt
                 (pasta^)    2.srt
                             3.srt
                      por => 1.srt
                 (pasta^)    2.srt
                             3.srt
                      names.txt
