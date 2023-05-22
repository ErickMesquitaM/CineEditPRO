

# CineEditPRO

Ferramenta de organizar filmes e séries.


### não esqueça de instalar as dependências.


## Comandos



* **movies**
     
     Comando para organizar os filmes, todos os filmes deverão estar em "files/movies" separados por pastas.

     **Exemplo**

          <_NOME DO FILME_> => filme.mkv
                               pob.srt
                               eng.srt
                               capa.jpg


     * **Arquivo de Vídeo**: nome é irrelevante, pois o nome que vai sair no output vai ser o nome da pasta.

     * **Legendas**: pode adicionar quantas quiser, vai salvar o idioma da legenda com o nome do arquivo, então é **IMPOTANTE** que os nomes estejam certos. Ex: "por" para português, "pob" para português-brasil, "eng" para inglês etc...

     * **Capa**: opcional, pode ter o nome que quiser


     * **OBS**
          * A capa existente no arquivo sera **perdida**, sê o arquivo de vídeo tiver uma capa, será necessário colocar outra de novo
          
          * Legendas já embutidas no arquivo, **não** serão perdida, porém sê o arquivo tiver mais do mesmo idioma, **apenas** o maior será gravado no output. E quando os arquivos tiverem legendas embutidas, demora mais porque é preciso extrair a legenda, e verificar sê ela é compativel com o metodo que essa feramenta utiliza.

          * a ferramenta já codifica as legendas para o formato de "UTF-8" para que não tenha problemas com os acentos e outras coisas.




* **tv-show**

     Comando para organizar séries, todas as temporadas deverão estar separados por pastas em "files/tv-show", ordem dos arquivos **MUITO** importante.

     **Exemplo**

          <_TEMPORADA 1_>   =>  episodio_1.mkv
                                episodio_2.mkv
                                episodio_3.mkv
                                 
                                eng => legenda_1.srt
                                       legenda_2.srt
                                       legenda_3.srt
                            
                                pob => algo_1.srt
                                       algo_2.srt
                                       algo_3.srt
                                
                                names.txt


     * **Arquivos de Vídeo**: nome é irrelevante, **porém** a ordem deve ser do primeiro episódio ao último.

     * **Legendas**: as legendas ficaram em pastas, cada pasta referente ao idioma da legenda, pode ter quantas legendas quiser, e de qualquer idioma. Ex: para legendas em português o nome da pasta deve ser "por" ou "pob"(português-brasil).

     * **Nome**: os nomes dos episódios deverão ficar no arquivo de "names.txt", **cada nome em uma linha**, e **não** é pra colocar o número dos episódios.


     * **OBS**

          * a ferramenta funciona assim, pega o primeiro arquivo de video, e coloca a primeira legenda de cada pasta(sê tiver), e sai com o primeiro nome da lista de nomes, já numerado.

          * ah alguns outros comandos que possa facilitar esse trabalho.

               * **get-subs**, sê você baixar as séries do **"RARBG"**, esse comando vai te ajudar bastante.

               * **get-names**, pega os todos nomes dos episodios de uma série.

          * sê deu algum problema no meio da execução, ou você cancelou por algum motivo, e quer continuar de onde parou, você precisa remover os arquivos já feitos(nomes, videos, e legendas), e passar um "json" como argumento na hora de executar o comando.
               
                    Ex: npm run tv-show '[{\"name\": \"Season 2\", \"index\": 9}
                    
               *name referente ao nome da pasta, e o index de onde  parou para que o número do episódio fique certo




* **sync** 

     Comando onde sincroniza as legendas, as legendas deverão estar separadas por pastas referente a temporada em "files/subs".

     *exemplo*

          "POB TEMPORADA 1"   =>   algo_2.srt
                                   algo_3.srt
                                   legenda_1.srt
                                   legenda_4.srt
                                   subtitle5.srt

     
     * **Pastas com as Temporadas**: pode ter quantas pastas quiser.

     * **Milissegundos**: passar como argumento a quantidade de "ms" que deseja adicionar/diminuir.
     
               Ex: npm run sync "ms=-1200"




* **get-names**

     Comando onde pega os nomes dos episódios de uma série.

     * **npm run get-names "<NOME ORIGINAL DA SÉRIE>"**

     * isso retornará um arquivo referente a cada temporada, em "files/output".

     * **OBS**: API ultilizada é do *TMDB*, é preciso criar uma conta, criar um arquivo ".env" e colocar sua "api key".
      
               Ex: *TMDB_API_KEY=<API_KEY>*

     * **TMDB** https://developer.themoviedb.org/docs




* **get-subs**

     Comando útil apenas para quem usa o **"RARBG"**, apenas colocar a pasta de "Subs" que vem quando baixa algo do RARBG, que remove cada legenda de cada pasta e coloca em outra com o nome da pasta.

     **Exemplo**

     *input*

          "files/subs/Subs"   =>   série.S01E01 => 2_English.srt
                                   série.S01E02 => 2_English.srt
                                   série.S01E03 => 2_English.srt

     *output*

          "files/output/Subs" =>   série.S01E01.srt
                                   série.S01E02.srt
                                   série.S01E03.srt
