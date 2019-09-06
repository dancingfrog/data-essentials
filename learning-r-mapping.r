
library(maptools)
library(RPostgreSQL)
library(sp)
library(rgdal)
library(rgeos)
#library(sf)

data(wrld_simpl)
xlim <- c(-130,-60)
ylim <- c(45,80)
plot(wrld_simpl,xlim=xlim,ylim=ylim,col='olivedrab3',bg='lightblue') #plot(wrld_simpl)coords <- matrix(c(-122.92,-79.4, 49.277,43.66),ncol=2)
coords <- coordinates(coords)
spoints <- SpatialPoints(coords)
df <- data.frame(location=c("SFU","UofT"))
spointsdf <- SpatialPointsDataFrame(spoints,df)
plot(wrld_simpl) + plot(spointsdf,add=T,col=c('red','blue'),pch=16)

shp_dir<- file.path(getwd(), "data", "Pitney Bowes", "Tab", "201903", "EUR", "DNK", "DNK")
ogrListLayers(dsn = shp_dir)
file.path(shp_dir, "dnkap.shp")
options(warn=-1)                                                        # Warning message:
airport_points_shp <- readShapePoints(file.path(shp_dir, "dnkap.shp"))   # “readShapePoints is deprecated; use rgdal::readOGR or sf::st_read”
options(warn=0)
plot(wrld_simpl) + plot(airport_points_shp,add=T,col=c('red','blue'),pch=16)

shp_dir <- file.path(getwd(), "data", "HERE", "Postal Code Points", "USAM181H0NUS000DCM00", "SHP", "VT_SHP", "VT_SHP")
ogrListLayers(dsn = shp_dir)
postal_points_shp <- readOGR(dsn = shp_dir, layer = "USA_181H0_VT_POSTAL_CODE")
plot(wrld_simpl) + plot(postal_points_shp,add=T,col=c('red','blue'),pch=16)
