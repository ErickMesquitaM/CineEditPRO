# my-ffmpeg

Editor de séries e filmes

npm run movies: comando que arruma os filmes, na pasta de "files/movies", colocar cada filme separado por pasta,
em cada pasta tem que ter: o arquivo de video(qualquer nome), imagem pra capa(qualquer nome), legenda em português com o nome "pt" e a legenda em inglês com o nome "en".
TODOS OS ARQUIVOS DE CADA FILME DEV TAR NA PASTA REFÊRENTE AO FILME, O NOME DA PASTA VAI SER O QUE O ARQUIVO VAI FICAR. 

Ex: Nome do filme => filme.mp4
     (^pasta^)       en.srt
                     pt.sub
                     cover.jpg



npm run tv-show: comando que arruma série, na pasta de "files/tv-show", uma temporada da série,
tem que ter: pasta "videos" onde vai ficar os episódios, pasta "pt" onde vai ficar as legendas em português, pasta "en" onde vai ficar as legendas em inglês
e os nomde de cada episódio vai ficar em uma nota com o nome "names.txt" cada linha vai ser referente a cada episódio
A ORDEM DO ARQUIVOS IMPORTA MUITO, O SISTEMA PEGA O PRIMEIRO ARQUIVO DE CADA PASTA E CRIA UM NOVO E ASSIM POR DIANTE (n é preciso colocar o número de cada episódio)
