 function hexToRGB(hex, alpha) {
              var r = parseInt(hex.slice(1, 3), 16),
                  g = parseInt(hex.slice(3, 5), 16),
                  b = parseInt(hex.slice(5, 7), 16);
          
              if (alpha) {
                  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
              } else {
                  return "rgb(" + r + ", " + g + ", " + b + ")";
              }
          }

paletaColorLinea = palette('cb-Set2', 5).map(function(hex) {
              return hexToRGB('#' +hex,0.5); });

paletaColorProvedor = palette('cb-Set3', 3).map(function(hex) {                
                return hexToRGB('#' +hex,0.5); });

paletaColorProvedorLinea = palette('cb-Set3', 3).map(function(hex) {                
                    return hexToRGB('#' +hex,1); });