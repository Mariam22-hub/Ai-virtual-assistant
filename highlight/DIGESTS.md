## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
  integrity="sha384-9mu2JKpUImscOMmwjm1y6MA2YsW3amSoFNYwKeUHxaXYKQ1naywWmamEGMdviEen"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"
  integrity="sha384-WmGkHEmwSI19EhTfO1nrSk3RziUQKRWg3vO0Ur3VYZjWvJRdRnX4/scQg+S2w1fI"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-uBlc/xEFeDxZmBU7K/YWwi3ryXQrLQCAY2K1Dl3OD2DaAQBZZTt6Ew3aeDP20ix0 /es/languages/bash.js
sha384-4qer4rJCVxZjkwD4YaJfOnT2NOOt0qdjKYJM2076C+djiJ4lgrP1LVsB/MCpJSET /es/languages/bash.min.js
sha384-0OZaeLK1yb5eP3nW4y0JP1fVharSrsuv/1mkI/6/8aRFm9laYIWIMXjCOqu+vRW5 /es/languages/c.js
sha384-G7WtwjMBNGrPly3ZsbPhfnT0v88hG3Ea9fQhrSWfzj7cNAsXsU7EKMQLyLGj7vTH /es/languages/c.min.js
sha384-Wjwd1YEG/PYlkLHTWIx+RlPK6XboMN3bEpveERJ8D8Z4RaNE02Ho19ZFrSRPGi0j /es/languages/cpp.js
sha384-Q4zTNH8WsDVdSZbiZtzWS1HmAUcvMSdTmth9Uqgfjmx7Qzw6B8E3lC9ieUbE/9u4 /es/languages/cpp.min.js
sha384-Sp8E1Lb9fNhbvqBiogM60TCgpAIwYBi8WbHhIHcXO0bR5Z+9LeYwpDa1gkjzU99W /es/languages/csharp.js
sha384-huUb4Ol37G1WrtGV7bn1UArXcJSjD4tQswMGzgpNZYAPxR74MHTqW79z1dXWMvhk /es/languages/csharp.min.js
sha384-DA5ii4oN8R2fsamNkHOanSjuN4v7j5RIuheQqnxMQ4cFnfekeuhwu4IdNXiCf+UU /es/languages/css.js
sha384-OBugjfIr093hFCxTRdVfKH8Oe3yiBrS58bhyYYTUQJVobk6SUEjD7pnV8BPwsr8a /es/languages/css.min.js
sha384-hYnh6bxVnenrhg3HDafFjUPaO4yMWcNa6jjBCbcRJAzOW9RidrTLcmNgEyk1EkqC /es/languages/django.js
sha384-fYhQZafPWO54UUJ6/TWCLZVfptppoJrgZw8syHnvkUeAf7+lAiBkU3x8UQ7rTmvB /es/languages/django.min.js
sha384-CLo3x4rhnqUonsHs4zrr9gaMxc3gyLcDf2txgYmwyXDlHVe+FmQnYHguuDCbBQ5K /es/languages/elixir.js
sha384-B1unRJpfius4v1CDo8bNYlnKYL4h9uC7uhSE+fTC4WNSZwBHfHbD47N2bFBurjFF /es/languages/elixir.min.js
sha384-XcoPs3a4/IR69b/Dm+Q+u2pZ1mkg4OLQY3nregS20Zi93M17jhVxokvDNVBKwocg /es/languages/go.js
sha384-27jMAcMfx5pzlW2ntRUz1R22f43tLLOnYyDHss8iJBUi23iVzYrxbwQKY+LPU35B /es/languages/go.min.js
sha384-xG7D+neOE4ESa3no3TB3dmUhFAzqhWs44rleL/wq+h4+fnINKJvI2e/73Hcx67ig /es/languages/graphql.js
sha384-sYfgkTuyw8lkHmGdVV7Mw1/C2jkRl3ZKZrSceJsMaqZAG2RNed+pSOfjwMMEIBO7 /es/languages/graphql.min.js
sha384-WFJdA9Hz+G9NQx5vPba/tcGyIibm57UkKVY32wNB/94iT2FmPma5W7gY8p2l6qps /es/languages/java.js
sha384-coaxfgI2lKuDqSxfMlfyPq5WM0THaLGyATZHzaFMrWdIbPcLdduuItTe6AmT/m33 /es/languages/java.min.js
sha384-WCznKe2n87QvV/L1MlXN+S8R6NPUQGU34+AqogMuWGZJswSD6rt3Mgih+xuKlDgm /es/languages/javascript.js
sha384-eGsBtetyKPDKaLiTnxTzhSzTFM6A/yjHBQIj4rAMVaLPKW5tJb8U6XLr/AikCPd+ /es/languages/javascript.min.js
sha384-12GbYFzdyZCSmfBTmO2CR/qE89K5uE1PEuJ3QUwXH0Q9u+uoLNigjH9dG7LAxxiI /es/languages/json.js
sha384-+DT7AtubDhVDciRc6CgjJJRsCt0L8NC3Dh8n9Tj2tZWU8rWxDIj1ViubmUDn8OCY /es/languages/json.min.js
sha384-T5TWWx2SVBqE/AJVqpKp6D8+8rpEcX+Usy65BcRR6SM8QEh62nMtxDsowBlhx1Ay /es/languages/julia.js
sha384-NqyA97ZywXJCu5WG4NiDyJRAYm5L2aGPPTeGnRSfkEtK8Lch/likdativWWAbLUs /es/languages/julia.min.js
sha384-tsX5LI0gdW2Xk9ZMsj7B2vRchm3jC0zoc1r99Z1377aXFJJXimRtRYQprUJpSuu0 /es/languages/kotlin.js
sha384-mfmdbPhLobPr5OJzSXlWHDQDymRYyzedurWjJBvKVhlQGE+Jz/pN3D9lPEBIkDK2 /es/languages/kotlin.min.js
sha384-UgQTewauLJ4EgpADCJ99JfEtiPvw+fyaSrY1gtCVBviDNG7yCH5U7qutYptSfYk+ /es/languages/makefile.js
sha384-aUXBqKsjOzPD/W+hccF21KKWmWts/CrY/lWGJU+dAcsKtuh1/XtyDnzfLmqy/fV1 /es/languages/makefile.min.js
sha384-bWwkdmOCj83zZ8/m+oPD9goRMhrPCb25ZA6aTyg7vcsq9IpuyED38kQSw1Na4UTZ /es/languages/markdown.js
sha384-SqGSUq0DMQ0OUQnQnTuVDCJyhANd/MFNj+0PF67S+VXgHpR8A4tPsf/3GoSFRmrx /es/languages/markdown.min.js
sha384-3ETIPQZ3mDkQp0yO3vWqaxcOnISPBk4oE4DrkgRfbMW6rhFcvu7N/P8tucGbapAC /es/languages/objectivec.js
sha384-eSkOKizj8aZA0WJaMmTJA3uqUtTkbZ7PXAADzDquzxCLyb1BMNgF9cn7/FIu0wFR /es/languages/objectivec.min.js
sha384-6eW/GwBjd1p/IWWvPhtlCq8ZV/viLec5e+CL+RdqEVMAfnyfcuqhDzNA/eADmRK0 /es/languages/pgsql.js
sha384-zOSNwldQX3ufsVxttzdDmDOl9B8zrMIbr7l0ixGfdle/Ree4OxUJK7kQjCDqT45z /es/languages/pgsql.min.js
sha384-JBkI+6623OoC1qCgG+MY/Ta0qRYSzTDH4NGMA+7U8RNOjkh7geFvYpRidvdHs3zT /es/languages/php.js
sha384-6Znh5S5q9F0hGNMtdaihFL3RJeMqL1a/UecjgzaBrhoxe4sjd5aiEOgokt7blhSW /es/languages/php.min.js
sha384-mPk2tkg/c5SI4dHCkR5Qu1ez4fPORdygWO7o5RDnf2e4/szPsVDRxF1+tvJKDCpu /es/languages/prolog.js
sha384-MGwRmP+fUOD51bd1a03edAvcc1Aaq4Ddq8WnyV/cMWm7e2QIRDSkSOGOUAt5u06j /es/languages/prolog.min.js
sha384-+5oyk7Ed3OlvEWGj8xracq/6e52BScKUN4kxcreNwB7kfRTVsAMs/aAJM58dzIFN /es/languages/python.js
sha384-ND/UH2UkaeWiej5v/oJspfKDz9BGUaVpoDcz4cof0jaiv/mCigjvy7RQ7e+3S6bg /es/languages/python.min.js
sha384-BSeMSSkpHXATzXVnQDrjF2DPTOBSrKP8QqV0DcEVYa5k6JK9CSYxFKyEhj+Kqnde /es/languages/python-repl.js
sha384-sW9zIYfNc+qN/lya5oAmIdFlVbXjPLcdYkPSdRMpxO/xI2jbDW/Q4Etvx02DFOmf /es/languages/python-repl.min.js
sha384-GLWbnkTbelVKeKv8VxFhtauUDfV8uqxjBPEEZ3WYks9zmbd1rFCWmdzGucZn0+ZQ /es/languages/r.js
sha384-T5hv8+GOm2ni1B0cuZtt+8T0cIMH1CTycc9OQQH0GLcIQhmeBosyhcmcIv4r/1ag /es/languages/r.min.js
sha384-vs4jXytP3N3d5zRX15Fqc4u/kDI5jDr3PNYIvQ0mmmoU+o/yxJfu/+VYme6qIOa2 /es/languages/ruby.js
sha384-O4a+vELXT191NhKLE3TR5WQwDmQZ2izAhb2zETRxcPSXr6CJruqJ4a+GJpDlaqCF /es/languages/ruby.min.js
sha384-I4aH0szMeaCbcs8R7dhxA3p7ZBL/HFxnD5Gbz6l52kIrd/igSSFi/9sJCykNuL52 /es/languages/rust.js
sha384-1vvSh2x0WCtPLbkTMqNuf8JSZw8N5bSo9oONZ9vqU8NOBHPIuKt+kFdC8G5nA+P1 /es/languages/rust.min.js
sha384-lRhSX2XDrY27NzrAS1t4YaeRtwjsY41kFBbIEYltkmnsfSE7lbBJMQVds2u/MqTT /es/languages/scss.js
sha384-RDUehV4j9Do6iGkYq9Gjn3aUxh6x+NFER1sHpLUXsNoCFjah8Ysrlad8ukLbIr4J /es/languages/scss.min.js
sha384-dzLjhd9nNJH62idgKI1vZEKHRBtZXSgwWQdPR+emG7tfAN4BW2g+A5Xs2315Uxii /es/languages/shell.js
sha384-RKUoelG22/D7BV/bNpoGLNzdTgWRf/ACQX7y4BGyIzK6E+xUoXtm68WNQW2tSW8X /es/languages/shell.min.js
sha384-rBAFhyrcRcMNbVJ9g4k5y3eQDkjGdgoOb3oTWTbHgwyUgUNv3CK9wLsGy/d+52oa /es/languages/sql.js
sha384-8G3qMPeOeXVKZ0wGzMQHgMVQWixLw3EXFAcU+IFNLRe0WoZB5St3L3ZLTK62Nzns /es/languages/sql.min.js
sha384-LpDkuXFg1D+54cHhYqk9r9E4vKH0CGAnyBqiq5A6SnvPEIMTkMH8IN8i14JpJNhs /es/languages/swift.js
sha384-lJj3aAxzUpdk8StXN5j3OP20/Loadv+t8jYdMBYVqCaxtLHTpBUalFDsTPkC9Fov /es/languages/swift.min.js
sha384-CS3qiWid6Sod3yAiQwgPzy2ZerR00u/cwhnMxQrETuI74o006r1p5qj1U9Gdo4uD /es/languages/typescript.js
sha384-HHgazax8ozQ9RDWlJQyaFzaTk/OgTFRVHH+lcaYInkE8wVu5fnpkqkB3KUdzKcvE /es/languages/typescript.min.js
sha384-MX3xn8TktkjONV3aWF6Qn6WZyq2Lh/98p0v7D0qEoJ4WLdYjoAyXF/L/80q3qaEc /es/languages/yaml.js
sha384-4IiaMbQ0LBiRJYBGoAXsN+dV9qu/cGLES6IuVowdeCu/FAMY5/MQfD/bHXoL2YBb /es/languages/yaml.min.js
sha384-qbbaBGYYg7PdopdWOGj8KdkBosUDY5PAe3aTMJKTqWcriPBJJzCVu5BlwNEwqr9U /languages/bash.js
sha384-ByZsYVIHcE8sB12cYY+NUpM80NAWHoBs5SL8VVocIvqVLdXf1hmXNSBn/H9leT4c /languages/bash.min.js
sha384-VZxKf0mjKYDwZIgrW+InqDfJ0YwYUFEMw/4YmpV1oKtVXFVmVq/Ga1vgq6zKTUqS /languages/c.js
sha384-mWenE7UXKnmYRcJ3mh+Os3iZ43BmFf9x3AZMM6gi/2sT6vxouPWspbTdREwWDO3w /languages/c.min.js
sha384-J4Ge+xXjXgzbK2FP+OyzIGHLfKU/RR0+cH4JJCaczeLETtVIvJdvqfikWlDuQ66e /languages/cpp.js
sha384-LMyrRAiUz6we2SGvYrwDd4TJoJZ+m/5c+4n4E64KVkfWFcZdlrs4Wabr0crMesyy /languages/cpp.min.js
sha384-8sbRwiU8Ar2M7+w//1u7YiI1e7KsmB4k3QbW/m1IW5FVH51HiOpR7g5QGE3RqTNi /languages/csharp.js
sha384-wWP4JQEhRVshehTP7lUMDn3yhDI2+398vN2QW5LBt1xIpK0Gfu4dPviO8tP9XRo5 /languages/csharp.min.js
sha384-r9czyL17/ovexTOK33dRiTbHrtaMDzpUXW4iRpetdu1OhhckHXiFzpgZyni2t1PM /languages/css.js
sha384-HpHXnyEqHVbcY+nua3h7/ajfIrakWJxA3fmIZ9X9kbY45N6V+DPfMtfnLBeYEdCx /languages/css.min.js
sha384-dFC7/UlAe1aH832WvFmt6fwQFIha+bFdz4Jw/Stp0m65X0P0zgiyaSYVKpRyPCOo /languages/django.js
sha384-AqTOESQu37Lj9i0LQjA1B5Ju2XOJzwB7RR1NYcpo+JgnUF+UTdQi8km+UzU8uYBZ /languages/django.min.js
sha384-Bd2ywvYdN43SxOMuK6TJ8MEi/51znKu0cait9/ssPMJi6p9Q74aDle3iJ7V4bX2o /languages/elixir.js
sha384-qMYXRUi/Q9Ukntag3SOX3rOfkgLmmjlGA84X26QeOGixvWyfSGEiKwaw5ZKoSyBH /languages/elixir.min.js
sha384-lDCjdnxlW/GRZYzy4Zqkj833wJD7Hc2FP927RAtySEdrShMiUSXsWuFy1IC02qxU /languages/go.js
sha384-WmGkHEmwSI19EhTfO1nrSk3RziUQKRWg3vO0Ur3VYZjWvJRdRnX4/scQg+S2w1fI /languages/go.min.js
sha384-+9Rtg2Bz4pdOgkMjD/Y4IbvMzkuZqZyZwhBIbRD7254eY5Zm2Sf3UFI6Bt5tpyT5 /languages/graphql.js
sha384-yqNr+JW52pR9ZNw8CIHWgGMIrqhKhuOBDSlQ1ulf4Gt6wqi+VUMGHP5j6ReSSRY5 /languages/graphql.min.js
sha384-pYIeBYeCE96U9EkPcT4uJjNWyrB1BKB41JIadYJbvmGa5KacaoXtSQOUpBfeyWQX /languages/java.js
sha384-uUg+ux8epe42611RSvEkMX2gvEkMdw+l6xG5Z/aQriABp38RLyF9MjDZtlTlMuQY /languages/java.min.js
sha384-vJxw3XlwaqOQr8IlRPVIBO6DMML5W978fR21/GRI5PAF7yYi2WstLYNG1lXk6j9u /languages/javascript.js
sha384-44q2s9jxk8W5N9gAB0yn7UYLi9E2oVw8eHyaTZLkDS3WuZM/AttkAiVj6JoZuGS4 /languages/javascript.min.js
sha384-dq9sY7BcOdU/6YaN+YmFuWFG8MY2WYJG2w3RlDRfaVvjdHchE07Ss7ILfcZ56nUM /languages/json.js
sha384-RbRhXcXx5VHUdUaC5R0oV+XBXA5GhkaVCUzK8xN19K3FmtWSHyGVgulK92XnhBsI /languages/json.min.js
sha384-ejh0O6l/Lf9xflCigwVR6FqqJAWhVWB+M7kjlcNSQvtso+e2QBqicY9b56ih9a2X /languages/julia.js
sha384-ZqjopgKriSJBeG1uYhjsw3GyqKRlsBIGaR55EzUgK9wOsFdbB67p+I0Lu9qqDf2j /languages/julia.min.js
sha384-UjoANPpyYDKhhXCD7M94TUBIvEg+Yey//mTGwAKIPkAcmpT4QVk8D47YYWumt/ZR /languages/kotlin.js
sha384-vfngjS9mwSs6HkzR9wU3mDDip7sa8TLKAxsuQ9+ncUHU25slHzHOdx/0FWxvbg4I /languages/kotlin.min.js
sha384-LmfE+sO0d5qZL2Ka0DIrgJ/5U1plo4uFFAmgjcMxrQO+RkeWVYWuaphHAdrY9g7V /languages/makefile.js
sha384-NIrob3StFQyD/nlOsXVCeRsJ0N2SvFEDjFtYS393wbD3CY1eT+2kwT4RL7tpMMhs /languages/makefile.min.js
sha384-U+zIQPoVdPCO0o4poik2hYNbHtNm+L5OojDTulgIeEZTNz+LooLAm72d66mNjwKD /languages/markdown.js
sha384-mCUujHHbWJEjcupTTfWOk9YR3YCYNHaA578+TTXUd4LPi7fGNuMQbysbl1pmcIGd /languages/markdown.min.js
sha384-Cc1k3KuhHQqdKFz/qLsQbf9E1rahGF9daZ9proh9kVL6eww2g3xEHhMLe7YQka0z /languages/objectivec.js
sha384-laCnSBtpGFl9ww6pMsbiDiJocbu+HlV9qgfWjOoArDqQrnlxH3Qm9kia5N2cicKM /languages/objectivec.min.js
sha384-FbyEf9EotuzOvgY88yzeCiAnYTkV2uHiY+FkYU9uH1jJY/DmF8IvxDo0rnl4n3ug /languages/pgsql.js
sha384-Oo+KBAbqcXAtR0/yFlZsRvJSAITfvxhJ761p5yOO4pyEtYO6n/5j6eVI1dG8aGct /languages/pgsql.min.js
sha384-S1JDGPScVg8ikNKLZc4CSP0ZxLiJ7bOJMzTLfOzQiCxR6wPqAa+YtauHJXQpc2GV /languages/php.js
sha384-c1RNlWYUPEU/QhgCUumvQSdSFaq+yFhv3VfGTG/OTh8oirAi/Jnp6XbnqOLePgjg /languages/php.min.js
sha384-+dhWHH8GS/gUjdubeMgdyX8aDN4N/LhNBhAz5iip4JCXMuUEp1teltP5+jWNLwd2 /languages/prolog.js
sha384-UM9Lhdjkj0JpmTGkTvhc3JrFvbPmcGLGqzLsKAMP4hAKxussecmapCxDpWC5fHFu /languages/prolog.min.js
sha384-zdZio5RcGiKQJCpe/1IXujPle3bIY8sbmvCabSU5G5GzWAzZtoRZfg9QAQXCL08q /languages/python.js
sha384-IP4vv4Aoh9Lyg8QyzVkAmn2JGoDCpgVHzVSrD3Z+rVyn7+s4wx4pRjv+go3TEwfj /languages/python.min.js
sha384-7jEUoPRiHUgJOTai1kMkoxn2EnF86LMvN/MagHBb2SlmmV6Xd4jlrgQfLTzgM3sP /languages/python-repl.js
sha384-bKSBGjy2/8jltjSAlvCjAvEvjy8osMZfj37sBThcXS7n6SppraMRghmLmAxiapyN /languages/python-repl.min.js
sha384-Xa3MEXJyV9PD/wnbdHTdqvipEl9QqodA35i6Nmw/6wqrvQ585Q8EDfz7f2UCuYpU /languages/r.js
sha384-+z7INDMj7HMs67TuLfoyKa6TUHdTweahANtJ1Spg6uCa8/f1jFUf238jj53TDxmP /languages/r.min.js
sha384-AE7f30oAuQtqmFee9hPd2uoo44ZkyUY2wQL7DjjENhh2wrvS6q4mpxGtAxeCxiRQ /languages/ruby.js
sha384-pFZpTUpdH4YEXSenc9hfKZ4uCv2IQoJQCIlIHpA0fM2cvTVH8LuzQMNcGSRGeJG0 /languages/ruby.min.js
sha384-CA6FQ5i08WYjgGIhQBrXKmcJg42apGjTP9b5WqttVw3cYEtXwHHGo+XJLYS7u7F2 /languages/rust.js
sha384-ZQJ5PCEftpFqCZkLDs96CSDGddxBultwqTdlxjnJ5h2doMAQv0n1x66w7T/JQEyy /languages/rust.min.js
sha384-fwYddFsITuK2bPhi9RuIzwi4PTULEXgtEJsQzTdx97vOS/GHfrk+aNSLxEHgzQa5 /languages/scss.js
sha384-6u+QpCDqQidb5pcO+yBqy0xLJ30x30VlrFvXm8J84LMwGIw9q3U4u+Z9vFXlhB5x /languages/scss.min.js
sha384-KW3ZDReTAemYUfVHvH1MNQ/v6agCYYdMGdMteP/yVV+NetIJeDMx0ruUMTbr/SD3 /languages/shell.js
sha384-PDEMny3uYpCrSKwqVGLAwqCsc9u+9hYXauxVPqO6RXmlxSNKLoRByEBigU5lahmK /languages/shell.min.js
sha384-Dy7I/j0yJlyliWiNrkNqXfxDrbN65q40s3JColgTYZQ7QJa7lcmK0WUL3i00/T51 /languages/sql.js
sha384-8q00eP+tyV9451aJYD5ML3ftuHKsGnDcezp7EXMEclDg1fZVSoj8O+3VyJTkXmWp /languages/sql.min.js
sha384-Q1hSwaZr828HvfGGkcH9/K6Cg93VFYOWEZ8cpL7bUdzvzrSurur5RjoZjn46PokC /languages/swift.js
sha384-CYmrQ9dmDVxuVoM185jHQsjhiLlG/kQfabzRdOYsfUV2AQvpjQNrd2zVCpCC7N5j /languages/swift.min.js
sha384-yZXtQC/OmWoPykosK7vE1nCvV4E/six6+apjNau4JwBkejkea5nP7VBEJJkGnvoF /languages/typescript.js
sha384-ORwtVEfrCZ0gzGacgmfv1wOtxcPIaVfHKwq8dKQjObRwx3qpKjsSg1ldTu1PEgXd /languages/typescript.min.js
sha384-tB5cwwsX4Ddp7P4d+ZInDb3nt4ihEEglHXoQ18eVLlT7soEn7bfGfABWKIn1l+H2 /languages/yaml.js
sha384-WC56y8OaFPt5Kj2HX6JAumxUYEjQmBDcSTJy2pn/N8g7dg1hKjeNVrJYoxlpeVmz /languages/yaml.min.js
sha384-LBh2QsjFfkf677MrEQt1Br0ug+qSsTIzUoiR209APy395ozFF9YSPBALZciTTDT4 /highlight.js
sha384-tmjkehIr/OSdXqO8LRefa29crP7bqb5AFA5gXwr0ohfWd/zCREixGF5hlRZNhBtX /highlight.min.js
```

