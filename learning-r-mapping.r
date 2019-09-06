
library(DBI)
library(RPostgreSQL)
library(sp)
options(warn=-1)  # versions of GEOS runtime 3.7.2-CAPI-1.11.2 and GEOS at installation 3.7.1-CAPI-1.11.1 differ
library(rgdal)
library(rgeos)
library(sf)
library(maptools)
options(warn=0)

data(wrld_simpl)
xlim <- c(-130,-60)
ylim <- c(35,50)
plot(wrld_simpl,xlim=xlim,ylim=ylim,col='olivedrab3',bg='lightblue') #plot(wrld_simpl)coords <- matrix(c(-122.92,-79.4, 49.277,43.66),ncol=2)

coords <- matrix(c(-122.92,-79.4, 49.277,43.66),ncol=2)
coords <- coordinates(coords)
spoints <- SpatialPoints(coords)
df <- data.frame(location=c("SFU","UofT"))
spointsdf <- SpatialPointsDataFrame(spoints,df)
plot(wrld_simpl) + plot(spointsdf,add=T,col=c('red','blue'),pch=16)

shp_dir<- file.path(getwd(), "data", "Pitney Bowes", "Tab", "201903", "EUR", "DNK", "DNK")
ogrListLayers(dsn = shp_dir)
file.path(shp_dir, "dnkap.shp")
options(warn=-1)                                                         # Warning message:
airport_points_shp <- readShapePoints(file.path(shp_dir, "dnkap.shp"))   # “readShapePoints is deprecated; use rgdal::readOGR or sf::st_read”
options(warn=0)
xlim <- c(0,30)
ylim <- c(50,60)
plot(wrld_simpl,xlim=xlim,ylim=ylim) + plot(airport_points_shp,add=T,col=c('red','blue'),pch=16)

shp_dir <- file.path(getwd(), "data", "HERE", "Postal Code Points", "USAM181H0NUS000DCM00", "SHP", "VT_SHP", "VT_SHP")
ogrListLayers(dsn = shp_dir)
postal_points_shp <- readOGR(dsn = shp_dir, layer = "USA_181H0_VT_POSTAL_CODE")
xlim <- c(-85,-60)
ylim <- c(40,45)
plot(wrld_simpl,xlim=xlim,ylim=ylim) + plot(postal_points_shp,add=T,col=c('red','blue'),pch=16)
